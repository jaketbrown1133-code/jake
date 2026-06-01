"""
Asian Session Range Trading Bot — Tradovate / Alpha Futures
Runs nightly 7 PM – 3 AM EST automatically.

HOW TO RUN:
  python main.py

Keep your PC on and connected to the internet overnight.
"""

import time
import logging
import schedule
from datetime import datetime, timezone, timedelta

from auth import get_token
from data_feed import get_contract_id, get_current_price, get_account_balance, get_account_id
from strategy import build_range, check_for_signal
from risk_manager import RiskManager
from executor import place_order, cancel_all_orders, close_all_positions
from journal import log_trade, send_alert
from config import (
    CONTRACT_SYMBOL, SESSION_CLOSE_HOUR, SESSION_CLOSE_MINUTE,
    RANGE_BUILD_START_HOUR
)

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    handlers=[
        logging.FileHandler("bot.log"),
        logging.StreamHandler(),
    ],
)
logger = logging.getLogger(__name__)


def est_now() -> datetime:
    return datetime.now(timezone(timedelta(hours=-5)))


def run_session():
    logger.info("=" * 60)
    logger.info("Asian session bot starting up...")
    send_alert("Bot started", f"Asian session bot running for {CONTRACT_SYMBOL}")

    try:
        get_token()
        account_id = get_account_id()
        contract_id = get_contract_id()
        balance = get_account_balance()
        risk = RiskManager(starting_balance=balance)

        logger.info(f"Account ID: {account_id} | Balance: ${balance:.2f}")

        # Wait until 7 PM EST if started early
        while est_now().hour < RANGE_BUILD_START_HOUR:
            logger.info("Waiting for Tokyo open (7 PM EST)...")
            time.sleep(60)

        # Build the 7–8 PM range
        session_range = build_range(contract_id)

        logger.info("Watching for trade signals...")

        # Trade window: 8 PM to 3 AM EST
        while True:
            now = est_now()

            # Hard close at 3 AM
            if now.hour >= SESSION_CLOSE_HOUR and now.minute >= SESSION_CLOSE_MINUTE:
                logger.info("3 AM reached — closing all positions and stopping.")
                cancel_all_orders(account_id)
                close_all_positions(account_id, contract_id)
                send_alert("Bot stopped", "Session ended at 3 AM EST. Check journal for results.")
                break

            if not risk.can_trade():
                logger.info("Risk limit reached. Waiting for session end...")
                time.sleep(60)
                continue

            signal = check_for_signal(contract_id, session_range)

            if signal:
                contracts = risk.position_size(signal.entry, signal.stop_loss)
                logger.info(f"Executing: {signal.direction} {contracts}x @ {signal.entry:.2f}")

                place_order(account_id, contract_id, signal, contracts)
                log_trade(
                    symbol=CONTRACT_SYMBOL,
                    direction=signal.direction,
                    entry=signal.entry,
                    stop_loss=signal.stop_loss,
                    take_profit=signal.take_profit,
                    contracts=contracts,
                )
                send_alert(
                    f"Trade placed: {signal.direction} {CONTRACT_SYMBOL}",
                    f"Entry: {signal.entry:.2f}\nStop: {signal.stop_loss:.2f}\nTarget: {signal.take_profit:.2f}\nContracts: {contracts}"
                )

                # Wait for this trade to resolve before looking for the next one
                _wait_for_resolution(contract_id, signal, risk)

            time.sleep(15)   # Check every 15 seconds

    except Exception as e:
        logger.exception(f"Bot crashed: {e}")
        send_alert("Bot ERROR", f"The bot crashed with error:\n{e}")


def _wait_for_resolution(contract_id, signal, risk: RiskManager, timeout_seconds=3600):
    """Polls price until stop loss or take profit is hit, then records the result."""
    start = time.time()
    while time.time() - start < timeout_seconds:
        price = get_current_price(contract_id)

        if signal.direction == "BUY":
            if price <= signal.stop_loss:
                pnl = signal.stop_loss - signal.entry
                risk.record_trade(pnl)
                log_trade(CONTRACT_SYMBOL, signal.direction, signal.entry,
                          signal.stop_loss, signal.take_profit,
                          1, outcome="STOPPED OUT", pnl=pnl)
                logger.info(f"Stop loss hit. PnL: {pnl:.2f}")
                return
            if price >= signal.take_profit:
                pnl = signal.take_profit - signal.entry
                risk.record_trade(pnl)
                log_trade(CONTRACT_SYMBOL, signal.direction, signal.entry,
                          signal.stop_loss, signal.take_profit,
                          1, outcome="TARGET HIT", pnl=pnl)
                logger.info(f"Take profit hit. PnL: {pnl:.2f}")
                return
        else:  # SELL
            if price >= signal.stop_loss:
                pnl = signal.entry - signal.stop_loss
                risk.record_trade(-pnl)
                log_trade(CONTRACT_SYMBOL, signal.direction, signal.entry,
                          signal.stop_loss, signal.take_profit,
                          1, outcome="STOPPED OUT", pnl=-pnl)
                logger.info(f"Stop loss hit. PnL: {-pnl:.2f}")
                return
            if price <= signal.take_profit:
                pnl = signal.entry - signal.take_profit
                risk.record_trade(pnl)
                log_trade(CONTRACT_SYMBOL, signal.direction, signal.entry,
                          signal.stop_loss, signal.take_profit,
                          1, outcome="TARGET HIT", pnl=pnl)
                logger.info(f"Take profit hit. PnL: {pnl:.2f}")
                return

        time.sleep(10)


# Schedule the bot to run every night at 6:55 PM EST (5 min before Tokyo open)
schedule.every().day.at("18:55").do(run_session)

if __name__ == "__main__":
    logger.info("Scheduler started. Bot will run nightly at 6:55 PM EST.")
    logger.info("Keep this window open and your PC awake overnight.")
    logger.info("Press Ctrl+C to stop.\n")

    # Run immediately if already in the session window
    now = est_now()
    if RANGE_BUILD_START_HOUR - 1 <= now.hour < SESSION_CLOSE_HOUR or now.hour >= 19:
        logger.info("We're in session window — starting now.")
        run_session()
    else:
        while True:
            schedule.run_pending()
            time.sleep(30)

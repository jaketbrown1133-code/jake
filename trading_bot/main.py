"""
Asian Session Range Trading Bot — Alpaca Paper Trading
Runs nightly 7 PM – 3 AM EST automatically.

HOW TO RUN:
  python main.py

Keep your PC on and connected to the internet overnight.
"""

import time
import logging
import schedule
from datetime import datetime, timezone, timedelta

from data_feed import get_current_price, get_account_balance
from strategy import build_range, check_for_signal
from risk_manager import RiskManager
from executor import place_order, cancel_all_orders, close_all_positions
from journal import log_trade, send_alert
from config import (
    SYMBOL, SESSION_CLOSE_HOUR, SESSION_CLOSE_MINUTE, RANGE_BUILD_START_HOUR
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
    logger.info("Asian session bot starting...")
    send_alert("Bot started", f"Asian session bot running for {SYMBOL}")

    try:
        balance = get_account_balance()
        risk = RiskManager(starting_balance=balance)
        logger.info(f"Account balance: ${balance:.2f}")

        # Wait until 7 PM EST if started early
        while est_now().hour < RANGE_BUILD_START_HOUR:
            logger.info("Waiting for Tokyo open (7 PM EST)...")
            time.sleep(60)

        # Build the 7–8 PM range
        session_range = build_range()

        logger.info("Watching for trade signals...")

        while True:
            now = est_now()

            # Hard close at 3 AM — only triggers between midnight and 6 AM to avoid false positives
            if 0 <= now.hour <= 6 and now.hour >= SESSION_CLOSE_HOUR:
                logger.info("3 AM reached — closing all positions.")
                cancel_all_orders()
                close_all_positions()
                send_alert("Bot stopped", "Session ended at 3 AM EST. Check trade_journal.csv for results.")
                break

            if not risk.can_trade():
                time.sleep(60)
                continue

            signal = check_for_signal(session_range)

            if signal:
                shares = risk.position_size(signal.entry)
                place_order(signal, shares)
                log_trade(
                    symbol=SYMBOL,
                    direction=signal.direction,
                    entry=signal.entry,
                    stop_loss=signal.stop_loss,
                    take_profit=signal.take_profit,
                    shares=shares,
                )
                send_alert(
                    f"Trade placed: {signal.direction} {SYMBOL}",
                    f"Entry: {signal.entry:.2f}\nStop: {signal.stop_loss:.2f}\nTarget: {signal.take_profit:.2f}\nShares: {shares}"
                )
                _wait_for_resolution(signal, risk)

            time.sleep(15)

    except Exception as e:
        logger.exception(f"Bot crashed: {e}")
        send_alert("Bot ERROR", f"The bot crashed:\n{e}")


def _wait_for_resolution(signal, risk: RiskManager, timeout_seconds=3600):
    start = time.time()
    while time.time() - start < timeout_seconds:
        price = get_current_price()

        if signal.direction == "BUY":
            if price <= signal.stop_loss:
                pnl = signal.stop_loss - signal.entry
                risk.record_trade(pnl)
                log_trade(SYMBOL, signal.direction, signal.entry, signal.stop_loss,
                          signal.take_profit, 1, outcome="STOPPED OUT", pnl=pnl)
                return
            if price >= signal.take_profit:
                pnl = signal.take_profit - signal.entry
                risk.record_trade(pnl)
                log_trade(SYMBOL, signal.direction, signal.entry, signal.stop_loss,
                          signal.take_profit, 1, outcome="TARGET HIT", pnl=pnl)
                return
        else:
            if price >= signal.stop_loss:
                pnl = signal.entry - signal.stop_loss
                risk.record_trade(-pnl)
                log_trade(SYMBOL, signal.direction, signal.entry, signal.stop_loss,
                          signal.take_profit, 1, outcome="STOPPED OUT", pnl=-pnl)
                return
            if price <= signal.take_profit:
                pnl = signal.entry - signal.take_profit
                risk.record_trade(pnl)
                log_trade(SYMBOL, signal.direction, signal.entry, signal.stop_loss,
                          signal.take_profit, 1, outcome="TARGET HIT", pnl=pnl)
                return

        time.sleep(10)


schedule.every().day.at("18:55").do(run_session)

if __name__ == "__main__":
    logger.info("Scheduler started. Bot will run nightly at 6:55 PM EST.")
    logger.info("Keep this window open and your PC awake overnight.")
    logger.info("Press Ctrl+C to stop.\n")

    now = est_now()
    if RANGE_BUILD_START_HOUR - 1 <= now.hour or now.hour < SESSION_CLOSE_HOUR:
        logger.info("In session window — starting now.")
        run_session()
    else:
        while True:
            schedule.run_pending()
            time.sleep(30)

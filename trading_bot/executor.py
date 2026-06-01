import requests
import logging
from auth import auth_headers
from config import BASE_URL, SYMBOL
from strategy import TradeSignal

logger = logging.getLogger(__name__)


def place_order(signal: TradeSignal, shares: int) -> dict:
    side = "buy" if signal.direction == "BUY" else "sell"

    # Main market order
    payload = {
        "symbol": SYMBOL,
        "qty": str(shares),
        "side": side,
        "type": "market",
        "time_in_force": "day",
        "order_class": "bracket",
        "stop_loss": {"stop_price": str(round(signal.stop_loss, 2))},
        "take_profit": {"limit_price": str(round(signal.take_profit, 2))},
    }

    resp = requests.post(
        f"{BASE_URL}/v2/orders",
        json=payload,
        headers=auth_headers(),
        timeout=10,
    )
    resp.raise_for_status()
    data = resp.json()
    logger.info(f"Order placed: {side.upper()} {shares} shares of {SYMBOL} | ID: {data.get('id')}")
    return data


def cancel_all_orders():
    resp = requests.delete(
        f"{BASE_URL}/v2/orders",
        headers=auth_headers(),
        timeout=10,
    )
    resp.raise_for_status()
    logger.info("All open orders cancelled.")


def close_all_positions():
    resp = requests.delete(
        f"{BASE_URL}/v2/positions",
        headers=auth_headers(),
        timeout=10,
    )
    resp.raise_for_status()
    logger.info("All positions closed.")

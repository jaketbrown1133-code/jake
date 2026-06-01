import requests
import logging
from auth import auth_headers
from config import BASE_URL
from strategy import TradeSignal

logger = logging.getLogger(__name__)


def place_order(account_id: int, contract_id: int, signal: TradeSignal, contracts: int) -> dict:
    """Places a bracket order: entry + stop loss + take profit."""

    action = "Buy" if signal.direction == "BUY" else "Sell"

    # Place the entry order (market order for immediate fill)
    order_payload = {
        "accountSpec": str(account_id),
        "accountId": account_id,
        "action": action,
        "symbol": "",           # Tradovate uses contractId
        "orderQty": contracts,
        "orderType": "Market",
        "contractId": contract_id,
        "isAutomated": True,
    }

    resp = requests.post(
        f"{BASE_URL}/order/placeorder",
        json=order_payload,
        headers=auth_headers(),
        timeout=10,
    )
    resp.raise_for_status()
    order_data = resp.json()
    order_id = order_data.get("orderId")
    logger.info(f"Entry order placed: {action} {contracts} contract(s) | Order ID: {order_id}")

    # Place stop loss
    stop_action = "Sell" if signal.direction == "BUY" else "Buy"
    _place_stop(account_id, contract_id, stop_action, contracts, signal.stop_loss)

    # Place take profit limit order
    _place_limit(account_id, contract_id, stop_action, contracts, signal.take_profit)

    return order_data


def _place_stop(account_id, contract_id, action, qty, price):
    payload = {
        "accountId": account_id,
        "action": action,
        "contractId": contract_id,
        "orderQty": qty,
        "orderType": "Stop",
        "stopPrice": price,
        "isAutomated": True,
    }
    resp = requests.post(f"{BASE_URL}/order/placeorder", json=payload, headers=auth_headers(), timeout=10)
    resp.raise_for_status()
    logger.info(f"Stop loss placed at {price}")


def _place_limit(account_id, contract_id, action, qty, price):
    payload = {
        "accountId": account_id,
        "action": action,
        "contractId": contract_id,
        "orderQty": qty,
        "orderType": "Limit",
        "price": price,
        "isAutomated": True,
    }
    resp = requests.post(f"{BASE_URL}/order/placeorder", json=payload, headers=auth_headers(), timeout=10)
    resp.raise_for_status()
    logger.info(f"Take profit placed at {price}")


def cancel_all_orders(account_id: int):
    resp = requests.post(
        f"{BASE_URL}/order/cancelallorders",
        json={"accountId": account_id},
        headers=auth_headers(),
        timeout=10,
    )
    resp.raise_for_status()
    logger.info("All open orders cancelled.")


def close_all_positions(account_id: int, contract_id: int):
    resp = requests.post(
        f"{BASE_URL}/order/liquidateposition",
        json={"accountId": account_id, "contractId": contract_id, "admin": False},
        headers=auth_headers(),
        timeout=10,
    )
    resp.raise_for_status()
    logger.info("All positions liquidated.")

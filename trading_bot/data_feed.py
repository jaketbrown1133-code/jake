import requests
import logging
from auth import auth_headers
from config import BASE_URL, CONTRACT_SYMBOL

logger = logging.getLogger(__name__)


def get_contract_id() -> int:
    resp = requests.get(
        f"{BASE_URL}/contract/find",
        params={"name": CONTRACT_SYMBOL},
        headers=auth_headers(),
        timeout=10,
    )
    resp.raise_for_status()
    data = resp.json()
    contract_id = data["id"]
    logger.info(f"Contract {CONTRACT_SYMBOL} -> id {contract_id}")
    return contract_id


def get_current_price(contract_id: int) -> float:
    """Returns the last traded price for the contract."""
    resp = requests.get(
        f"{BASE_URL}/md/getQuote",
        params={"contractId": contract_id},
        headers=auth_headers(),
        timeout=10,
    )
    resp.raise_for_status()
    data = resp.json()
    # Use mid price between bid and ask
    bid = data.get("bid", 0)
    ask = data.get("ask", 0)
    if bid and ask:
        return (bid + ask) / 2
    return data.get("last", 0)


def get_account_balance() -> float:
    resp = requests.get(
        f"{BASE_URL}/cashBalance/getCashBalanceSnapshot",
        headers=auth_headers(),
        timeout=10,
    )
    resp.raise_for_status()
    items = resp.json()
    if items:
        return items[0].get("realizedPnL", 0) + items[0].get("initialMargin", 0)
    return 0


def get_account_id() -> int:
    resp = requests.get(
        f"{BASE_URL}/account/list",
        headers=auth_headers(),
        timeout=10,
    )
    resp.raise_for_status()
    accounts = resp.json()
    return accounts[0]["id"]

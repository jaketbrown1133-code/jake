import requests
import logging
from auth import auth_headers
from config import BASE_URL, SYMBOL

logger = logging.getLogger(__name__)

DATA_URL = "https://data.alpaca.markets"


def get_current_price() -> float:
    resp = requests.get(
        f"{DATA_URL}/v2/stocks/{SYMBOL}/trades/latest",
        headers=auth_headers(),
        timeout=10,
    )
    resp.raise_for_status()
    return float(resp.json()["trade"]["p"])


def get_account_balance() -> float:
    resp = requests.get(
        f"{BASE_URL}/v2/account",
        headers=auth_headers(),
        timeout=10,
    )
    resp.raise_for_status()
    return float(resp.json()["equity"])


def get_account() -> dict:
    resp = requests.get(
        f"{BASE_URL}/v2/account",
        headers=auth_headers(),
        timeout=10,
    )
    resp.raise_for_status()
    return resp.json()

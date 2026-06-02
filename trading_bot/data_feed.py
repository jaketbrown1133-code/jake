import requests
import logging
from auth import auth_headers
from config import BASE_URL, SYMBOL

logger = logging.getLogger(__name__)

DATA_URL = "https://data.alpaca.markets"


def get_current_price() -> float:
    # Use crypto endpoint — trades 24/7 including overnight Asian session
    symbol_clean = SYMBOL.replace("/", "")
    resp = requests.get(
        f"{DATA_URL}/v1beta3/crypto/us/latest/trades?symbols={symbol_clean}",
        headers=auth_headers(),
        timeout=10,
    )
    resp.raise_for_status()
    return float(resp.json()["trades"][symbol_clean]["p"])


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

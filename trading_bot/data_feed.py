import requests
import logging
from typing import Optional
from auth import auth_headers
from config import BASE_URL, SYMBOL

logger = logging.getLogger(__name__)

DATA_URL = "https://data.alpaca.markets"


def get_current_price() -> float:
    # Alpaca crypto endpoint requires slash-encoded symbol: BTC%2FUSD
    symbol_encoded = SYMBOL.replace("/", "%2F")
    resp = requests.get(
        f"{DATA_URL}/v1beta3/crypto/us/latest/trades?symbols={symbol_encoded}",
        headers=auth_headers(),
        timeout=10,
    )
    resp.raise_for_status()
    return float(resp.json()["trades"][SYMBOL]["p"])


def get_account_balance() -> float:
    resp = requests.get(
        f"{BASE_URL}/v2/account",
        headers=auth_headers(),
        timeout=10,
    )
    resp.raise_for_status()
    return float(resp.json()["equity"])


def get_open_position() -> Optional[dict]:
    """Returns the open position for SYMBOL, or None if flat."""
    symbol_encoded = SYMBOL.replace("/", "%2F")
    resp = requests.get(
        f"{BASE_URL}/v2/positions/{symbol_encoded}",
        headers=auth_headers(),
        timeout=10,
    )
    if resp.status_code == 404:
        return None
    resp.raise_for_status()
    return resp.json()


def get_account() -> dict:
    resp = requests.get(
        f"{BASE_URL}/v2/account",
        headers=auth_headers(),
        timeout=10,
    )
    resp.raise_for_status()
    return resp.json()

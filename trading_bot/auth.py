import requests
import time
import logging
from config import (
    TRADOVATE_USERNAME, TRADOVATE_PASSWORD, TRADOVATE_APP_ID,
    TRADOVATE_APP_VERSION, TRADOVATE_CID, TRADOVATE_SEC, BASE_URL
)

logger = logging.getLogger(__name__)

_access_token = None
_token_expiry = 0


def get_token() -> str:
    global _access_token, _token_expiry
    if _access_token and time.time() < _token_expiry - 60:
        return _access_token

    payload = {
        "name": TRADOVATE_USERNAME,
        "password": TRADOVATE_PASSWORD,
        "appId": TRADOVATE_APP_ID,
        "appVersion": TRADOVATE_APP_VERSION,
        "cid": TRADOVATE_CID,
        "sec": TRADOVATE_SEC,
    }

    resp = requests.post(f"{BASE_URL}/auth/accesstokenrequest", json=payload, timeout=10)
    resp.raise_for_status()
    data = resp.json()

    if "errorText" in data:
        raise RuntimeError(f"Auth failed: {data['errorText']}")

    _access_token = data["accessToken"]
    # Tradovate tokens last 80 minutes
    _token_expiry = time.time() + 80 * 60
    logger.info("Tradovate auth token refreshed.")
    return _access_token


def auth_headers() -> dict:
    return {"Authorization": f"Bearer {get_token()}"}

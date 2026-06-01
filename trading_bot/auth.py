from config import ALPACA_API_KEY, ALPACA_SECRET_KEY

def auth_headers() -> dict:
    return {
        "APCA-API-KEY-ID": ALPACA_API_KEY,
        "APCA-API-SECRET-KEY": ALPACA_SECRET_KEY,
    }

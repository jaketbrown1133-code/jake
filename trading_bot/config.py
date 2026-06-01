# Tradovate API credentials — fill these in from your Tradovate account
# NEVER share or commit this file with real credentials

TRADOVATE_USERNAME = "your_username"
TRADOVATE_PASSWORD = "your_password"
TRADOVATE_APP_ID = "your_app_id"          # From Tradovate developer portal
TRADOVATE_APP_VERSION = "1.0"
TRADOVATE_CID = "your_cid"               # Client ID from developer portal
TRADOVATE_SEC = "your_secret"            # Client secret from developer portal

# Use demo endpoint while testing, live when ready
USE_LIVE = False
BASE_URL = "https://live.tradovateapi.com/v1" if USE_LIVE else "https://demo.tradovateapi.com/v1"
WS_URL = "wss://md.tradovateapi.com/v1/websocket" if USE_LIVE else "wss://md.sim.tradovateapi.com/v1/websocket"

# What to trade — Micro E-mini NQ futures (smaller contract, lower risk for beginners)
CONTRACT_SYMBOL = "MNQM5"   # Update the month code each expiry (M=June, U=Sept, Z=Dec, H=March)

# Risk settings
RISK_PER_TRADE_PCT = 0.01     # 1% of account per trade
MAX_TRADES_PER_NIGHT = 3
MAX_DAILY_LOSS_PCT = 0.03     # Stop trading if down 3% on the night
REWARD_RISK_RATIO = 2.0       # Target 2:1 reward to risk

# Session timing (all times EST)
RANGE_BUILD_START_HOUR = 19   # 7 PM — Tokyo open
RANGE_BUILD_END_HOUR = 20     # 8 PM — end of range-building window
SESSION_CLOSE_HOUR = 3        # 3 AM — close all before London open
SESSION_CLOSE_MINUTE = 0

# Email alerts (optional — leave blank to disable)
ALERT_EMAIL = ""              # e.g. "you@gmail.com"
ALERT_EMAIL_PASSWORD = ""     # Gmail app password (not your login password)
ALERT_TO_EMAIL = ""

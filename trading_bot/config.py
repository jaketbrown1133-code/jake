# Alpaca API credentials — fill these in from your Alpaca account
# NEVER share or commit this file with real credentials

ALPACA_API_KEY = "your_api_key_here"
ALPACA_SECRET_KEY = "your_secret_key_here"

# Use paper trading endpoint while testing (completely free, no real money)
USE_LIVE = False
BASE_URL = "https://api.alpaca.markets" if USE_LIVE else "https://paper-api.alpaca.markets"

# What to trade — BTC/USD trades 24/7 including overnight Asian session
SYMBOL = "BTC/USD"

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

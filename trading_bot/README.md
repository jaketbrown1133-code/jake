# Asian Session Trading Bot — Tradovate / Alpha Futures

## Setup (do this once)

### 1. Install Python
Download from https://python.org — version 3.10 or newer.

### 2. Install dependencies
Open a terminal in this folder and run:
```
pip install -r requirements.txt
```

### 3. Get your Tradovate API credentials
1. Log into Tradovate
2. Go to **Settings → API Access**
3. Create an application — copy the App ID, CID, and Secret

### 4. Fill in config.py
Open `config.py` and fill in:
- Your Tradovate username and password
- Your App ID, CID, and Secret
- Your email (optional, for trade alerts)

### 5. Start on DEMO first
In `config.py`, keep `USE_LIVE = False` until you've seen it work on paper for at least 2 weeks.

### 6. Update the contract symbol each expiry
`CONTRACT_SYMBOL` in config.py needs to match the front-month contract:
- March = H (e.g. MNQH6)
- June = M (e.g. MNQM6)
- September = U (e.g. MNQU6)
- December = Z (e.g. MNQZ6)

---

## Running the bot

```
python main.py
```

- Leave the terminal window open
- Keep your PC awake and connected to the internet
- The bot runs 7 PM – 3 AM EST automatically every night

---

## Files
| File | What it does |
|---|---|
| `config.py` | Your settings and credentials |
| `auth.py` | Handles Tradovate login tokens |
| `data_feed.py` | Gets live prices and account info |
| `strategy.py` | Builds the range and generates signals |
| `risk_manager.py` | Position sizing and loss limits |
| `executor.py` | Places and cancels orders |
| `journal.py` | Logs every trade to CSV + sends email alerts |
| `main.py` | The main loop that runs everything |
| `trade_journal.csv` | Auto-created — your trade history |
| `bot.log` | Auto-created — full log of everything the bot did |

---

## IMPORTANT DISCLAIMER
This bot is for educational purposes. Automated trading carries significant financial risk.
Always test on a demo account before using real money. Past performance does not guarantee future results.

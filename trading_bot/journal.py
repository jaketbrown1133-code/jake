import csv
import os
import smtplib
import logging
from datetime import datetime
from email.mime.text import MIMEText
from config import ALERT_EMAIL, ALERT_EMAIL_PASSWORD, ALERT_TO_EMAIL

logger = logging.getLogger(__name__)

JOURNAL_FILE = "trade_journal.csv"
HEADERS = ["date", "time_est", "symbol", "direction", "entry", "stop_loss",
           "take_profit", "shares", "outcome", "pnl", "notes"]


def log_trade(symbol, direction, entry, stop_loss, take_profit,
              shares, outcome="OPEN", pnl=0.0, notes=""):
    file_exists = os.path.isfile(JOURNAL_FILE)
    now = datetime.now()
    row = {
        "date": now.strftime("%Y-%m-%d"),
        "time_est": now.strftime("%H:%M:%S"),
        "symbol": symbol,
        "direction": direction,
        "entry": entry,
        "stop_loss": stop_loss,
        "take_profit": take_profit,
        "shares": shares,
        "outcome": outcome,
        "pnl": pnl,
        "notes": notes,
    }
    with open(JOURNAL_FILE, "a", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=HEADERS)
        if not file_exists:
            writer.writeheader()
        writer.writerow(row)
    logger.info(f"Trade logged: {direction} {symbol} @ {entry}")


def send_alert(subject: str, body: str):
    if not ALERT_EMAIL:
        return
    try:
        msg = MIMEText(body)
        msg["Subject"] = subject
        msg["From"] = ALERT_EMAIL
        msg["To"] = ALERT_TO_EMAIL
        with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
            server.login(ALERT_EMAIL, ALERT_EMAIL_PASSWORD)
            server.send_message(msg)
        logger.info(f"Alert sent: {subject}")
    except Exception as e:
        logger.warning(f"Failed to send alert: {e}")

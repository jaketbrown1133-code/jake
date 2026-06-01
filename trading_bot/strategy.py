import time
import logging
from datetime import datetime, timezone, timedelta
from dataclasses import dataclass
from typing import Optional
from data_feed import get_current_price
from config import RANGE_BUILD_START_HOUR, RANGE_BUILD_END_HOUR

logger = logging.getLogger(__name__)


@dataclass
class SessionRange:
    high: float = 0.0
    low: float = float("inf")
    built: bool = False


@dataclass
class TradeSignal:
    direction: str       # "BUY" or "SELL"
    entry: float
    stop_loss: float
    take_profit: float


def build_range(poll_seconds: int = 30) -> SessionRange:
    r = SessionRange()
    logger.info("Building session range (7 PM – 8 PM EST)...")

    while True:
        now = _est_now()
        if now.hour >= RANGE_BUILD_END_HOUR:
            break

        price = get_current_price()
        if price > r.high:
            r.high = price
        if price < r.low:
            r.low = price

        logger.info(f"Range — High: {r.high:.2f}  Low: {r.low:.2f}  Price: {price:.2f}")
        time.sleep(poll_seconds)

    r.built = True
    logger.info(f"Range built — High: {r.high:.2f}  Low: {r.low:.2f}")
    return r


def check_for_signal(r: SessionRange) -> Optional[TradeSignal]:
    price = get_current_price()
    buffer = (r.high - r.low) * 0.03   # 3% of range as buffer zone

    # Price touching bottom of range — BUY
    if abs(price - r.low) <= buffer:
        stop = r.low - (r.high - r.low) * 0.3
        target = price + (price - stop) * 2.0
        logger.info(f"BUY signal @ {price:.2f} | Stop: {stop:.2f} | Target: {target:.2f}")
        return TradeSignal("BUY", price, stop, target)

    # Price touching top of range — SELL (short)
    if abs(price - r.high) <= buffer:
        stop = r.high + (r.high - r.low) * 0.3
        target = price - (stop - price) * 2.0
        logger.info(f"SELL signal @ {price:.2f} | Stop: {stop:.2f} | Target: {target:.2f}")
        return TradeSignal("SELL", price, stop, target)

    return None


def _est_now() -> datetime:
    return datetime.now(timezone(timedelta(hours=-5)))

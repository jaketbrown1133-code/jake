import time
import logging
from datetime import datetime, timezone
from dataclasses import dataclass, field
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
    direction: str          # "BUY" or "SELL"
    entry: float
    stop_loss: float
    take_profit: float


def build_range(contract_id: int, poll_seconds: int = 30) -> SessionRange:
    """
    Watches price from RANGE_BUILD_START_HOUR to RANGE_BUILD_END_HOUR EST
    and records the high/low of that window.
    """
    r = SessionRange()
    logger.info("Building session range...")

    while True:
        now_est = _est_now()
        if now_est.hour >= RANGE_BUILD_END_HOUR:
            break

        price = get_current_price(contract_id)
        if price > r.high:
            r.high = price
        if price < r.low:
            r.low = price

        logger.info(f"Range so far — High: {r.high:.2f}  Low: {r.low:.2f}  Current: {price:.2f}")
        time.sleep(poll_seconds)

    r.built = True
    logger.info(f"Range built — High: {r.high:.2f}  Low: {r.low:.2f}")
    return r


def check_for_signal(contract_id: int, r: SessionRange, tick_size: float = 0.25) -> Optional[TradeSignal]:
    """
    Returns a TradeSignal if price is touching range support or resistance.
    tick_size: minimum price movement for the instrument (0.25 for MNQ)
    """
    price = get_current_price(contract_id)
    range_height = r.high - r.low
    buffer = tick_size * 4   # Allow a small buffer zone near the levels

    # Price touching the bottom of range — BUY signal
    if abs(price - r.low) <= buffer:
        stop = r.low - (range_height * 0.3)
        target = price + (price - stop) * 2.0
        logger.info(f"BUY signal at {price:.2f} | Stop: {stop:.2f} | Target: {target:.2f}")
        return TradeSignal("BUY", price, stop, target)

    # Price touching the top of range — SELL signal
    if abs(price - r.high) <= buffer:
        stop = r.high + (range_height * 0.3)
        target = price - (stop - price) * 2.0
        logger.info(f"SELL signal at {price:.2f} | Stop: {stop:.2f} | Target: {target:.2f}")
        return TradeSignal("SELL", price, stop, target)

    return None


def _est_now() -> datetime:
    from datetime import timezone, timedelta
    est = timezone(timedelta(hours=-5))
    return datetime.now(est)

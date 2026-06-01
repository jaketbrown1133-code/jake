import logging
from config import RISK_PER_TRADE_PCT, MAX_DAILY_LOSS_PCT, MAX_TRADES_PER_NIGHT

logger = logging.getLogger(__name__)


class RiskManager:
    def __init__(self, starting_balance: float):
        self.starting_balance = starting_balance
        self.trades_tonight = 0
        self.realized_pnl_tonight = 0.0

    def can_trade(self) -> bool:
        if self.trades_tonight >= MAX_TRADES_PER_NIGHT:
            logger.warning(f"Max trades per night ({MAX_TRADES_PER_NIGHT}) reached.")
            return False

        loss_limit = self.starting_balance * MAX_DAILY_LOSS_PCT
        if self.realized_pnl_tonight <= -loss_limit:
            logger.warning(f"Daily loss limit hit (${loss_limit:.2f}). Done for the night.")
            return False

        return True

    def position_size(self, entry_price: float) -> int:
        """Returns number of shares to buy based on 1% account risk."""
        risk_dollars = self.starting_balance * RISK_PER_TRADE_PCT
        # Risk 5% of entry price per share as a stop distance approximation
        stop_distance = entry_price * 0.05
        shares = int(risk_dollars / stop_distance)
        shares = max(1, shares)
        logger.info(f"Position size: {shares} shares | Risk: ${risk_dollars:.2f}")
        return shares

    def record_trade(self, pnl: float):
        self.trades_tonight += 1
        self.realized_pnl_tonight += pnl
        logger.info(f"Trade #{self.trades_tonight} recorded. PnL: ${pnl:.2f} | Tonight: ${self.realized_pnl_tonight:.2f}")

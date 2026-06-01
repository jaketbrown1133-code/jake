import logging
from config import RISK_PER_TRADE_PCT, MAX_DAILY_LOSS_PCT, MAX_TRADES_PER_NIGHT

logger = logging.getLogger(__name__)

# MNQ tick value: $0.50 per tick, tick size 0.25 points
MNQ_TICK_SIZE = 0.25
MNQ_TICK_VALUE = 0.50


class RiskManager:
    def __init__(self, starting_balance: float):
        self.starting_balance = starting_balance
        self.trades_tonight = 0
        self.realized_pnl_tonight = 0.0

    def can_trade(self) -> bool:
        if self.trades_tonight >= MAX_TRADES_PER_NIGHT:
            logger.warning(f"Max trades per night ({MAX_TRADES_PER_NIGHT}) reached. No more trades.")
            return False

        loss_limit = self.starting_balance * MAX_DAILY_LOSS_PCT
        if self.realized_pnl_tonight <= -loss_limit:
            logger.warning(f"Daily loss limit hit (${loss_limit:.2f}). Shutting down for the night.")
            return False

        return True

    def position_size(self, entry: float, stop_loss: float) -> int:
        """Returns number of contracts to trade based on risk per trade."""
        risk_dollars = self.starting_balance * RISK_PER_TRADE_PCT
        stop_distance = abs(entry - stop_loss)
        ticks_at_risk = stop_distance / MNQ_TICK_SIZE
        dollars_per_contract = ticks_at_risk * MNQ_TICK_VALUE

        if dollars_per_contract == 0:
            return 1

        contracts = int(risk_dollars / dollars_per_contract)
        contracts = max(1, contracts)   # Always trade at least 1
        logger.info(f"Position size: {contracts} contract(s) | Risk: ${risk_dollars:.2f} | Stop distance: {stop_distance:.2f} pts")
        return contracts

    def record_trade(self, pnl: float):
        self.trades_tonight += 1
        self.realized_pnl_tonight += pnl
        logger.info(f"Trade recorded. PnL: ${pnl:.2f} | Tonight total: ${self.realized_pnl_tonight:.2f} | Trades: {self.trades_tonight}")

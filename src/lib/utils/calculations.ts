import { Position } from "../../type";

export const calculatePosition = (
  initialCapital: number,
  percentage: number,
  entryPrice: number,
  riskAmount: number,
  rewardRatio: number,
  entryFee: number,
): Omit<Position, "id" | "status" | "exitFee" | "finalPnL"> => {
  const rawAmount = initialCapital * (percentage / 100);
  const netAmount = rawAmount - entryFee;
  const units = netAmount / entryPrice;
  const riskPerUnit = riskAmount / units;
  const stopLoss = entryPrice - riskPerUnit;
  const rewardAmount = riskAmount * rewardRatio;
  const rewardPerUnit = rewardAmount / units;
  const target = entryPrice + rewardPerUnit;

  return {
    percentage,
    amount: rawAmount,
    netAmount,
    units,
    entry: entryPrice,
    stopLoss,
    target,
    riskAmount,
    potentialGain: rewardAmount,
    entryFee,
  };
};
export const getAvailableBalance = (
  initialCapital: number,
  positions: Position[],
): number => {
  const usedCapital = positions.reduce((sum, pos) => sum + pos.amount, 0);
  return initialCapital - usedCapital;
};

export const getTotalBalance = (
  initialCapital: number,
  positions: Position[],
): number => {
  const pnl = positions.reduce((sum, pos) => {
    if (pos.status === "open") return sum;
    return sum + (pos.finalPnL || 0);
  }, 0);
  return initialCapital + pnl;
};

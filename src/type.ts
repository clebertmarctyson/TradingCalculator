export interface Position {
  id: string;
  percentage: number;
  amount: number;
  netAmount: number;
  units: number;
  entry: number;
  stopLoss: number;
  target: number;
  riskAmount: number;
  potentialGain: number;
  entryFee: number;
  exitFee?: number;
  status: "open" | "won" | "lost";
  finalPnL?: number;
}

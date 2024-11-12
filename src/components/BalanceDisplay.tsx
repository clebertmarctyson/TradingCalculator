import {
  getAvailableBalance,
  getTotalBalance,
} from "../lib/utils/calculations";

import { Position } from "../type";

interface BalanceDisplayProps {
  initialCapital: number;
  positions: Position[];
}

export const BalanceDisplay = ({
  initialCapital,
  positions,
}: BalanceDisplayProps) => {
  const totalBalance = getTotalBalance(initialCapital, positions);
  const availableBalance = getAvailableBalance(initialCapital, positions);
  const totalPnL = totalBalance - initialCapital;

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <h3 className="text-sm text-gray-400">Total Balance</h3>
          <p
            className={`text-2xl font-bold ${totalPnL >= 0 ? "text-green-400" : "text-red-400"}`}
          >
            ${totalBalance.toFixed(2)}
          </p>
        </div>
        <div>
          <h3 className="text-sm text-gray-400">Available Balance</h3>
          <p className="text-2xl font-bold text-blue-400">
            ${availableBalance.toFixed(2)}
          </p>
        </div>
        <div>
          <h3 className="text-sm text-gray-400">Total P&L</h3>
          <p
            className={`text-2xl font-bold ${totalPnL >= 0 ? "text-green-400" : "text-red-400"}`}
          >
            ${totalPnL.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};

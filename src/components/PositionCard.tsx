import { useState } from "react";
import { useTradeStore } from "../lib/store";
import { Position } from "../type";
import { ClosePositionModal } from "./ClosePositionModal";
import { DataRow } from "./DataRow";

interface PositionCardProps {
  position: Position;
}

export const PositionCard = ({ position }: PositionCardProps) => {
  const [isCloseModalOpen, setIsCloseModalOpen] = useState(false);
  const [closeType, setCloseType] = useState<"win" | "loss">("win");
  const { closePosition, removePosition } = useTradeStore();

  const handleClosePosition = (exitFee: number) => {
    closePosition(position.id, closeType === "win" ? "won" : "lost", exitFee);
  };

  const handleRemove = () => {
    if (confirm("Are you sure you want to remove this position?")) {
      removePosition(position.id);
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg relative">
      {position.status === "open" && (
        <button
          onClick={handleRemove}
          className="absolute top-2 right-2 text-gray-400 hover:text-red-400"
        >
          ✕
        </button>
      )}

      <h3 className="text-xl font-bold text-blue-400 mb-4">
        Position ({position.percentage}%)
      </h3>

      <DataRow
        label="Gross Amount"
        value={position.amount.toFixed(2)}
        prefix="$"
      />
      <DataRow label="Fee" value={position.entryFee.toFixed(2)} prefix="$" />
      <DataRow
        label="Net Amount"
        value={position.netAmount.toFixed(2)}
        prefix="$"
      />
      <DataRow label="Units" value={position.units.toFixed(8)} />
      <DataRow label="Entry" value={position.entry.toFixed(2)} prefix="$" />
      <DataRow
        label="Stop Loss"
        value={position.stopLoss.toFixed(2)}
        prefix="$"
      />
      <DataRow label="Target" value={position.target.toFixed(2)} prefix="$" />
      <DataRow label="Risk" value={position.riskAmount.toFixed(2)} prefix="$" />
      <DataRow
        label="Potential Gain"
        value={position.potentialGain.toFixed(2)}
        prefix="$"
      />

      {position.status === "open" ? (
        <div className="flex gap-4 mt-4">
          <button
            onClick={() => {
              setCloseType("win");
              setIsCloseModalOpen(true);
            }}
            className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md"
          >
            Hit Target
          </button>
          <button
            onClick={() => {
              setCloseType("loss");
              setIsCloseModalOpen(true);
            }}
            className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md"
          >
            Hit Stop Loss
          </button>
        </div>
      ) : (
        <div
          className={`mt-4 p-2 rounded-md text-center ${
            position.status === "won"
              ? "bg-green-900 text-green-200"
              : "bg-red-900 text-red-200"
          }`}
        >
          Final P&L: ${position.finalPnL?.toFixed(2)}
          {position.exitFee && (
            <div className="text-sm mt-1">
              Exit Fee: ${position.exitFee.toFixed(2)}
            </div>
          )}
        </div>
      )}

      <ClosePositionModal
        isOpen={isCloseModalOpen}
        onClose={() => setIsCloseModalOpen(false)}
        onConfirm={handleClosePosition}
        type={closeType}
      />
    </div>
  );
};

import { useState } from "react";

interface ClosePositionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (exitFee: number) => void;
  type: "win" | "loss";
}

export const ClosePositionModal = ({
  isOpen,
  onClose,
  onConfirm,
  type,
}: ClosePositionModalProps) => {
  const [exitFee, setExitFee] = useState(3.15);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirm(exitFee);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-gray-800 p-6 rounded-lg w-96">
        <h3 className="text-xl font-bold text-gray-200 mb-4">
          Close Position - {type === "win" ? "Hit Target" : "Hit Stop Loss"}
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="text-sm font-medium text-gray-200">
              Exit Fee ($)
            </label>
            <input
              type="number"
              value={exitFee}
              onChange={(e) => setExitFee(parseFloat(e.target.value))}
              step="0.01"
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md mt-1"
            />
          </div>
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-700 text-gray-200 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-4 py-2 text-white rounded-md ${
                type === "win"
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-red-600 hover:bg-red-700"
              }`}
            >
              Confirm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

import { useState } from "react";

interface AddPositionInputProps {
  onAdd: (percentage: number) => void;
}

export const AddPositionInput = ({ onAdd }: AddPositionInputProps) => {
  const [percentage, setPercentage] = useState<number>(30);

  const handleAdd = () => {
    if (percentage > 0 && percentage <= 100) {
      onAdd(percentage);
      setPercentage(30); // Reset to default
    }
  };

  return (
    <div className="flex items-end gap-4 mb-6">
      <div className="flex flex-col space-y-2">
        <label className="text-sm font-medium text-gray-200">
          Position Size (%)
        </label>
        <input
          type="number"
          value={percentage}
          onChange={(e) => setPercentage(parseFloat(e.target.value))}
          min="0"
          max="100"
          step="1"
          className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 text-gray-200"
        />
      </div>
      <button
        onClick={handleAdd}
        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
      >
        Add Position
      </button>
    </div>
  );
};

import { useState } from "react";

import { useTradeStore } from "./lib/store";
import { InputField } from "./components/InputField";
import { AddPositionInput } from "./components/AddPositionInput";
import { PositionCard } from "./components/PositionCard";
import { BalanceDisplay } from "./components/BalanceDisplay";

export default function App() {
  const {
    initialCapital,
    currentPrice,
    riskAmount,
    rewardRatio,
    defaultFee,
    positions,
    darkMode,
    setInitialCapital,
    setCurrentPrice,
    setRiskAmount,
    setRewardRatio,
    setDefaultFee,
    addPosition,
    toggleDarkMode,
  } = useTradeStore();

  return (
    <div
      className={`min-h-screen ${darkMode ? "bg-gray-900" : "bg-gray-100"} p-6`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-200">Trade Calculator</h1>
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg bg-gray-800 text-gray-200"
          >
            Toggle Theme
          </button>
        </div>

        <BalanceDisplay initialCapital={initialCapital} positions={positions} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <InputField
            label="Initial Capital ($)"
            value={initialCapital}
            onChange={setInitialCapital}
            step={100}
          />
          <InputField
            label="Current Price ($)"
            value={currentPrice}
            onChange={setCurrentPrice}
          />
          <InputField
            label="Risk Amount ($)"
            value={riskAmount}
            onChange={setRiskAmount}
          />
          <InputField
            label="Reward Ratio"
            value={rewardRatio}
            onChange={setRewardRatio}
            step={0.1}
          />
          <InputField
            label="Default Fee ($)"
            value={defaultFee}
            onChange={setDefaultFee}
            step={0.01}
          />
        </div>

        <AddPositionInput onAdd={addPosition} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {positions.map((position) => (
            <PositionCard key={position.id} position={position} />
          ))}
        </div>
      </div>
    </div>
  );
}

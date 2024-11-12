import { create } from "zustand";
import { persist } from "zustand/middleware";
import { calculatePosition, getAvailableBalance } from "./utils/calculations";
import { Position } from "../type";

interface TradeStore {
  initialCapital: number;
  currentPrice: number;
  riskAmount: number;
  rewardRatio: number;
  defaultFee: number;
  positions: Position[];
  darkMode: boolean;
  setInitialCapital: (amount: number) => void;
  setCurrentPrice: (price: number) => void;
  setRiskAmount: (amount: number) => void;
  setRewardRatio: (ratio: number) => void;
  setDefaultFee: (fee: number) => void;
  addPosition: (percentage: number) => void;
  removePosition: (id: string) => void;
  closePosition: (id: string, status: "won" | "lost", exitFee: number) => void;
  toggleDarkMode: () => void;
}

export const useTradeStore = create(
  persist<TradeStore>(
    (set, get) => ({
      initialCapital: 3000,
      currentPrice: 89114.54,
      riskAmount: 30,
      rewardRatio: 1,
      defaultFee: 3.15,
      positions: [],
      darkMode: true,

      setInitialCapital: (amount) => set({ initialCapital: amount }),
      setCurrentPrice: (price) => set({ currentPrice: price }),
      setRiskAmount: (amount) => set({ riskAmount: amount }),
      setRewardRatio: (ratio) => set({ rewardRatio: ratio }),
      setDefaultFee: (fee) => set({ defaultFee: fee }),

      addPosition: (percentage) =>
        set((state) => {
          const availableBalance = getAvailableBalance(
            state.initialCapital,
            state.positions
          );
          const maxAllowedPercentage =
            (availableBalance / state.initialCapital) * 100;

          if (percentage > maxAllowedPercentage) {
            alert(
              `Cannot open position. Maximum allowed percentage is ${maxAllowedPercentage.toFixed(
                2
              )}%`
            );
            return state;
          }

          const position = calculatePosition(
            state.initialCapital,
            percentage,
            state.currentPrice,
            state.riskAmount,
            state.rewardRatio,
            state.defaultFee
          );

          return {
            positions: [
              ...state.positions,
              { ...position, id: crypto.randomUUID(), status: "open" as const },
            ],
          };
        }),

      removePosition: (id) =>
        set((state) => ({
          positions: state.positions.filter((pos) => pos.id !== id),
        })),

      closePosition: (id, status, exitFee) =>
        set((state) => ({
          positions: state.positions.map((pos) => {
            if (pos.id !== id) return pos;

            const finalPnL =
              status === "won"
                ? pos.potentialGain - exitFee
                : -pos.riskAmount - exitFee;

            return {
              ...pos,
              status,
              exitFee,
              finalPnL,
            };
          }),
        })),

      toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
    }),
    {
      name: "trade-store",
    }
  )
);

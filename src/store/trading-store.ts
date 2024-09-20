import { create, StateCreator } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type TradingState = {
  base?: string;
  baseBalance: number;
  baseAmount: string;
  quote?: string;
  quoteBalance: number;
  quoteAmount: string;
};

type TradingAction = {
  setBase: (base: TradingState['base']) => void;
  setBaseBalance: (baseBalance: TradingState['baseBalance']) => void;
  setBaseAmount: (baseAmount: TradingState['quoteAmount']) => void;
  setQuote: (quote: TradingState['quote']) => void;
  setQuoteBalance: (quoteBalance: TradingState['quoteBalance']) => void;
  setQuoteAmount: (quoteAmount: TradingState['baseAmount']) => void;
  rotate: () => void;
};

const tradingStoreSlice: StateCreator<TradingState & TradingAction> = (set) => ({
  base: 'BTC',
  baseBalance: 270,
  baseAmount: '',
  quote: 'USDT',
  quoteBalance: 2800,
  quoteAmount: '',
  setBase: (base) => set({ base }),
  setBaseBalance: (baseBalance) => set({ baseBalance }),
  setBaseAmount: (baseAmount) => set({ baseAmount }),
  setQuote: (quote) => set({ quote }),
  setQuoteBalance: (quoteBalance) => set({ quoteBalance }),
  setQuoteAmount: (quoteAmount) => set({ quoteAmount }),
  rotate: () =>
    set((state) => ({
      base: state.quote,
      baseBalance: state.quoteBalance,
      baseAmount: state.quoteAmount,
      quote: state.base,
      quoteBalance: state.quoteBalance,
      quoteAmount: state.baseAmount,
    })),
});

export const useTradingStore = create(
  persist(tradingStoreSlice, { name: 'trading', storage: createJSONStorage(() => sessionStorage) })
);

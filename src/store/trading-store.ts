import { create, StateCreator } from 'zustand';

type TradingState = {
  base?: string;
  baseBalance: number;
  quote?: string;
  quoteBalance: number;
};

type TradingAction = {
  setBase: (base: TradingState['base']) => void;
  setBaseBalance: (baseBalance: TradingState['baseBalance']) => void;
  setQuote: (quote: TradingState['quote']) => void;
  setQuoteBalance: (quoteBalance: TradingState['quoteBalance']) => void;
};

const tradingStoreSlice: StateCreator<TradingState & TradingAction> = (set, get) => ({
  base: 'BTC',
  baseBalance: 270,
  quote: 'USDT',
  quoteBalance: 2800,
  setBase: (base) => (get().quote && get().quote === base ? undefined : set({ base })),
  setBaseBalance: (baseBalance) => set({ baseBalance }),
  setQuote: (quote) => (get().base && get().base === quote ? undefined : set({ quote })),
  setQuoteBalance: (quoteBalance) => set({ quoteBalance }),
});

export const useTradingStore = create(tradingStoreSlice);

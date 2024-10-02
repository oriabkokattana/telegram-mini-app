import { create, StateCreator } from 'zustand';

type TradingState = {
  base?: string;
  baseAmount: string;
  quote?: string;
  quoteAmount: string;
};

type TradingAction = {
  setBase: (base: TradingState['base']) => void;
  setBaseAmount: (baseAmount: TradingState['quoteAmount']) => void;
  setQuote: (quote: TradingState['quote']) => void;
  setQuoteAmount: (quoteAmount: TradingState['baseAmount']) => void;
  rotate: () => void;
};

const tradingStoreSlice: StateCreator<TradingState & TradingAction> = (set) => ({
  base: '',
  baseBalance: 270,
  baseAmount: '',
  quote: 'USDT',
  quoteBalance: 2800,
  quoteAmount: '',
  setBase: (base) => set({ base }),
  setBaseAmount: (baseAmount) => set({ baseAmount }),
  setQuote: (quote) => set({ quote }),
  setQuoteAmount: (quoteAmount) => set({ quoteAmount }),
  rotate: () =>
    set((state) => ({
      base: state.quote,
      baseAmount: state.quoteAmount,
      quote: state.base,
      quoteAmount: state.baseAmount,
    })),
});

export const useTradingStore = create(tradingStoreSlice);

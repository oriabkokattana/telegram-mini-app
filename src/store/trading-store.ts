import { create, StateCreator } from 'zustand';

type TradingState = {
  base?: string;
  baseName?: string;
  baseAmount: string;
  quote?: string;
  quoteName?: string;
  quoteAmount: string;
};

type TradingAction = {
  setBase: (base: TradingState['base'], baseName: TradingState['baseName']) => void;
  setBaseAmount: (baseAmount: TradingState['quoteAmount']) => void;
  setQuote: (quote: TradingState['quote'], quoteName: TradingState['quoteName']) => void;
  setQuoteAmount: (quoteAmount: TradingState['baseAmount']) => void;
  rotate: () => void;
};

const tradingStoreSlice: StateCreator<TradingState & TradingAction> = (set) => ({
  base: undefined,
  baseName: undefined,
  baseBalance: 270,
  baseAmount: '',
  quote: undefined,
  quoteName: undefined,
  quoteBalance: 2800,
  quoteAmount: '',
  setBase: (base, baseName) => set({ base, baseName }),
  setBaseAmount: (baseAmount) => set({ baseAmount }),
  setQuote: (quote, quoteName) => set({ quote, quoteName }),
  setQuoteAmount: (quoteAmount) => set({ quoteAmount }),
  rotate: () =>
    set((state) => ({
      base: state.quote,
      baseName: state.quoteName,
      baseAmount: state.quoteAmount,
      quote: state.base,
      quoteName: state.quoteName,
      quoteAmount: state.baseAmount,
    })),
});

export const useTradingStore = create(tradingStoreSlice);

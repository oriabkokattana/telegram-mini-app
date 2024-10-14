import { create, StateCreator } from 'zustand';
import { DEFAULT_PRECISION } from '@/utils/balances';

type TradingState = {
  base?: string;
  baseName?: string;
  basePrecision: number;
  baseAmount: string;
  quote?: string;
  quoteName?: string;
  quotePrecision: number;
  quoteAmount: string;
};

type TradingAction = {
  setBase: (
    base: TradingState['base'],
    baseName: TradingState['baseName'],
    basePrecision: TradingState['basePrecision']
  ) => void;
  setBaseAmount: (baseAmount: TradingState['quoteAmount']) => void;
  setQuote: (
    quote: TradingState['quote'],
    quoteName: TradingState['quoteName'],
    quotePrecision: TradingState['quotePrecision']
  ) => void;
  setQuoteAmount: (quoteAmount: TradingState['baseAmount']) => void;
  rotate: () => void;
};

const tradingStoreSlice: StateCreator<TradingState & TradingAction> = (set) => ({
  base: undefined,
  baseName: undefined,
  basePrecision: DEFAULT_PRECISION,
  baseAmount: '',
  quote: undefined,
  quoteName: undefined,
  quotePrecision: DEFAULT_PRECISION,
  quoteAmount: '',
  setBase: (base, baseName, basePrecision) => set({ base, baseName, basePrecision }),
  setBaseAmount: (baseAmount) => set({ baseAmount }),
  setQuote: (quote, quoteName, quotePrecision) => set({ quote, quoteName, quotePrecision }),
  setQuoteAmount: (quoteAmount) => set({ quoteAmount }),
  rotate: () =>
    set((state) => ({
      base: state.quote,
      baseName: state.quoteName,
      basePrecision: state.quotePrecision,
      baseAmount: state.quoteAmount,
      quote: state.base,
      quoteName: state.baseName,
      quotePrecision: state.basePrecision,
      quoteAmount: state.baseAmount,
    })),
});

export const useTradingStore = create(tradingStoreSlice);

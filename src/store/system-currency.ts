import { useEffect, useState } from 'react';
import { create, StateCreator } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { customStorage } from '@/utils/cloud-storage';

import { SystemCurrencyItem } from '@/types';

type SystemCurrencyState = {
  currency: string;
  currencyRate: number;
  currencies: string[];
  rates: Record<string, SystemCurrencyItem>;
};

type SystemCurrencyAction = {
  setCurrency: (currency: SystemCurrencyState['currency']) => void;
  setRates: (rates: SystemCurrencyState['rates']) => void;
};

const systemCurrencySlice: StateCreator<SystemCurrencyState & SystemCurrencyAction> = (set) => ({
  currency: 'USDT',
  currencyRate: 1,
  currencies: [],
  rates: {
    USDT: {
      name: 'Tether USD',
      symbol: 'USDT',
      precision: 2,
      popular: true,
      slug: 'tether',
      price_usd: 1,
    },
  },
  setCurrency: (currency) =>
    set((state) => ({ currency, currencyRate: 1 / state.rates[currency].price_usd })),
  setRates: (rates) =>
    set((state) => ({
      rates,
      currencies: Object.keys(rates),
      currencyRate: 1 / rates[state.currency].price_usd,
    })),
});

const systemCurrencyStore = persist<SystemCurrencyState & SystemCurrencyAction>(
  systemCurrencySlice,
  {
    name: 'system-currency',
    storage: createJSONStorage(() => customStorage),
  }
);

export const useSystemCurrencyStore = create(systemCurrencyStore);

export const useSystemCurrencyStoreHydration = () => {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const unsubFinishHydration = useSystemCurrencyStore.persist.onFinishHydration(() =>
      setHydrated(true)
    );

    setHydrated(useSystemCurrencyStore.persist.hasHydrated());

    return () => {
      unsubFinishHydration();
    };
  }, []);

  return hydrated;
};

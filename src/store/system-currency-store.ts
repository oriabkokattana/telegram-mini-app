import { useEffect, useState } from 'react';
import { create, StateCreator } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { customStorage } from '@/utils/cloud-storage';

const SYSTEM_CURRENCIES = ['USD', 'BTC', 'BNB', 'ETH'];

type SystemCurrencyState = {
  currency: string;
  currencyRate: number;
  currencies: string[];
  rates: Record<string, number>;
};

type SystemCurrencyAction = {
  setCurrency: (currency: SystemCurrencyState['currency']) => void;
  setRates: (rates: SystemCurrencyState['rates']) => void;
};

const systemCurrencySlice: StateCreator<SystemCurrencyState & SystemCurrencyAction> = (set) => ({
  currency: 'USD',
  currencyRate: 1,
  currencies: [],
  rates: { USD: 1 },
  setCurrency: (currency) =>
    set((state) => ({ currency, currencyRate: 1 / state.rates[currency] })),
  setRates: (data) => {
    const rates: Record<string, number> = { USD: 1, ...data };
    set((state) => ({
      rates,
      // Should be fixed on backend! (slicing...)
      currencies: Object.keys(rates).filter((item) => SYSTEM_CURRENCIES.includes(item)),
      currencyRate: 1 / rates[state.currency],
    }));
  },
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

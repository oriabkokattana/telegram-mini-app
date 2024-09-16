import { useEffect, useState } from 'react';
import { create, StateCreator } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { customStorage } from '@/utils/cloud-storage';

const MAX_HISTORY_LEN = 6;

type SearchHistoryState = {
  history: string[];
};

type SearchHistoryAction = {
  addToHistory: (item: string) => void;
  clearHistory: () => void;
};

const systemCurrencySlice: StateCreator<SearchHistoryState & SearchHistoryAction> = (set, get) => ({
  history: [],
  addToHistory: (item) => {
    const history = get().history.filter((current) => current !== item);
    set({
      history: [
        item,
        ...(history.length >= MAX_HISTORY_LEN ? history.slice(0, MAX_HISTORY_LEN - 1) : history),
      ],
    });
  },
  clearHistory: () => set({ history: [] }),
});

const systemCurrencyStore = persist<SearchHistoryState & SearchHistoryAction>(systemCurrencySlice, {
  name: 'search-history',
  storage: createJSONStorage(() => customStorage),
});

export const useSearchHistoryStore = create(systemCurrencyStore);

export const useSearchHistoryStoreHydration = () => {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const unsubFinishHydration = useSearchHistoryStore.persist.onFinishHydration(() =>
      setHydrated(true)
    );

    setHydrated(useSearchHistoryStore.persist.hasHydrated());

    return () => {
      unsubFinishHydration();
    };
  }, []);

  return hydrated;
};

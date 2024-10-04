import { create, StateCreator } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type BalancesVisibleState = {
  visible: boolean;
};

type BalancesVisibleAction = {
  setVisible: (visible: BalancesVisibleState['visible']) => void;
};

const balancesVisibleStoreSlice: StateCreator<BalancesVisibleState & BalancesVisibleAction> = (
  set
) => ({
  visible: true,
  setVisible: (visible) => set({ visible }),
});

const persistedBalancesVisibleStore = persist<BalancesVisibleState & BalancesVisibleAction>(
  balancesVisibleStoreSlice,
  {
    name: 'balances-visible',
    storage: createJSONStorage(() => sessionStorage),
  }
);

export const useBalancesVisibleStore = create(persistedBalancesVisibleStore);

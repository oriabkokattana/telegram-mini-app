import { useEffect, useState } from 'react';
import { create, StateCreator } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { EMainScreenLabel } from '@/enums';
import { IconName } from '@/modules/core/design-system/icon';
import {
  trackDepositIconButtonClicked,
  trackWithdrawIconButtonClicked,
} from '@/utils/amplitude-events';
import { customStorage } from '@/utils/cloud-storage';

export const MAIN_SCREEN_LABELS = [
  EMainScreenLabel.deposit,
  EMainScreenLabel.swap,
  EMainScreenLabel.withdraw,
  EMainScreenLabel.history,
];

export const MAIN_SCREEN_LABELS_MAP: Record<
  EMainScreenLabel,
  { link: string; icon: IconName; onClick?: () => void }
> = {
  [EMainScreenLabel.deposit]: {
    link: '/deposit-token-select',
    icon: 'arrow-down-half-circle',
    onClick: trackDepositIconButtonClicked,
  },
  [EMainScreenLabel.history]: {
    link: '/analytics?tab=History',
    icon: 'list',
  },
  [EMainScreenLabel.swap]: {
    link: '/swap',
    icon: 'swap',
  },
  [EMainScreenLabel.withdraw]: {
    link: '/withdraw-token-select',
    icon: 'arrow-up-half-circle',
    onClick: trackWithdrawIconButtonClicked,
  },
};

type MainScreenLabelsState = {
  selectedLabels: EMainScreenLabel[];
  availableLabels: EMainScreenLabel[];
};

type MainScreenLabelsAction = {
  toggleLabel: (label: EMainScreenLabel) => void;
};

const mainScreenLabelsStoreSlice: StateCreator<MainScreenLabelsState & MainScreenLabelsAction> = (
  set
) => ({
  selectedLabels: [EMainScreenLabel.deposit, EMainScreenLabel.swap],
  availableLabels: MAIN_SCREEN_LABELS,
  toggleLabel: (label) =>
    set((state) => {
      const currentSelected = state.selectedLabels;
      let newSelected: EMainScreenLabel[] = [];
      if (currentSelected.includes(label)) {
        newSelected = currentSelected.filter((item) => item !== label);
      } else {
        newSelected = [...currentSelected, label];
      }
      console.log(newSelected);

      if (newSelected.length < 3) {
        return {
          selectedLabels: newSelected,
          availableLabels: MAIN_SCREEN_LABELS,
        };
      }
      return {
        selectedLabels: newSelected,
        availableLabels: MAIN_SCREEN_LABELS.filter((item) => newSelected.includes(item)),
      };
    }),
});

const mainScreenLabelsStore = persist<MainScreenLabelsState & MainScreenLabelsAction>(
  mainScreenLabelsStoreSlice,
  {
    name: 'main-screen-labels',
    storage: createJSONStorage(() => customStorage),
  }
);

export const useMainScreenLabelsStore = create(mainScreenLabelsStore);

export const useMainScreenLabelsStoreHydration = () => {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const unsubFinishHydration = useMainScreenLabelsStore.persist.onFinishHydration(() =>
      setHydrated(true)
    );

    setHydrated(useMainScreenLabelsStore.persist.hasHydrated());

    return () => {
      unsubFinishHydration();
    };
  }, []);

  return hydrated;
};

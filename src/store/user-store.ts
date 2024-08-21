import { useEffect, useState } from 'react';
import { create, StateCreator } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { customStorage } from '@/utils/cloud-storage';

type User = {
  accessToken: string;
  refreshToken: string;
};

type UserState = {
  user: User | null;
};

type UserAction = {
  setCredentials: (user: UserState['user']) => void;
  removeCredentials: () => void;
};

const userStoreSlice: StateCreator<UserState & UserAction> = (set) => ({
  user: null,
  setCredentials: (user) => set({ user }),
  removeCredentials: () => set({ user: null }),
});

const persistedUserStore = persist<UserState & UserAction>(userStoreSlice, {
  name: 'user',
  storage: createJSONStorage(() => customStorage),
});

export const useUserStore = create(persistedUserStore);

export const useUserStoreHydration = () => {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const unsubFinishHydration = useUserStore.persist.onFinishHydration(() => setHydrated(true));

    setHydrated(useUserStore.persist.hasHydrated());

    return () => {
      unsubFinishHydration();
    };
  }, []);

  return hydrated;
};

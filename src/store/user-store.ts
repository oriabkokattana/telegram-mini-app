import { useEffect, useState } from 'react';
import { create, StateCreator } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { customStorage } from '@/utils/cloud-storage';

interface User {
  accessToken: string;
  refreshToken: string;
}

interface UserState {
  user: User | null;
  setCredentials: (user: User) => void;
  removeCredentials: () => void;
}

const userStoreSlice: StateCreator<UserState> = (set) => ({
  user: null,
  setCredentials: (user) => set({ user }),
  removeCredentials: () => set({ user: null }),
});

const persistedUserStore = persist<UserState>(userStoreSlice, {
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

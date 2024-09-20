import { create, StateCreator } from 'zustand';

import { Profile } from '@/types';

type ProfileState = {
  profile: Profile | null;
};

type ProfileAction = {
  setProfile: (token: ProfileState['profile']) => void;
};

const profileStoreSlice: StateCreator<ProfileState & ProfileAction> = (set) => ({
  profile: null,
  setProfile: (profile) => set({ profile }),
});

export const useProfileStore = create(profileStoreSlice);

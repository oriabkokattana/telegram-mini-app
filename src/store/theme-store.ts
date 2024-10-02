import { create, StateCreator } from 'zustand';

type ThemeState = {
  theme: 'light' | 'dark';
};

type ThemeAction = {
  setTheme: (theme: ThemeState['theme']) => void;
};

const themeStoreSlice: StateCreator<ThemeState & ThemeAction> = (set) => ({
  theme: 'light',
  setTheme: (theme) => set({ theme }),
});

export const useThemeStore = create(themeStoreSlice);

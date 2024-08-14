import { initUtils } from '@telegram-apps/sdk-react';

export const openLink = (path: string) => {
  if (import.meta.env.DEV) {
    window.open(path);
  }
  const utils = initUtils();
  utils.openLink(path, { tryBrowser: true });
};

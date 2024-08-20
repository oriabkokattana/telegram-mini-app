import { initUtils } from '@telegram-apps/sdk-react';

export const openExternalLink = (path?: string) => {
  if (!path) {
    return;
  }
  if (sessionStorage.getItem('____mocked')) {
    window.open(path);
  } else {
    const utils = initUtils();
    utils.openLink(path, { tryBrowser: true });
  }
};

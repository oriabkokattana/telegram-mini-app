import { useEffect } from 'react';
import { useMiniApp } from '@telegram-apps/sdk-react';

export type BgVariant = 'gray' | 'white' | 'dark' | 'light';

const getColorByVariant = (variant: BgVariant) => {
  switch (variant) {
    case 'gray':
      return '#F7F7F7';
    case 'white':
      return '#FFFFFF';
    case 'dark':
      return '#0c0612';
    case 'light':
      return '#fefefe';
    default:
      return '#FFFFFF';
  }
};

export const useSetAppBg = (variant: BgVariant) => {
  const miniApp = useMiniApp();

  useEffect(() => {
    if (miniApp.supports('setHeaderColor')) {
      miniApp.setHeaderColor(getColorByVariant(variant));
    }
    if (miniApp.supports('setBackgroundColor')) {
      miniApp.setBgColor(getColorByVariant(variant));
    }
  }, [variant]);
};

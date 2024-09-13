import { useEffect } from 'react';
import { useMiniApp } from '@telegram-apps/sdk-react';

export type BgVariant = 'gray' | 'white';

const getColorByVariant = (variant: BgVariant) => {
  switch (variant) {
    case 'gray':
      return '#F7F7F7';
    case 'white':
      return '#FFFFFF';
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

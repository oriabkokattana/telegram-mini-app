import { useLaunchParams } from '@telegram-apps/sdk-react';

export const useCheckBottomGap = () => {
  const { platform } = useLaunchParams();

  return platform === 'ios';
};

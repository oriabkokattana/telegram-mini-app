import { useEffect } from 'react';
import { MainButtonParams, useMainButton } from '@telegram-apps/sdk-react';

export type MainButtonVariant = 'light' | 'dark';

const getPalleteByVariant = (
  variant: MainButtonVariant
): Pick<MainButtonParams, 'bgColor' | 'textColor'> => {
  switch (variant) {
    case 'dark':
      return { bgColor: '#1F1F1F', textColor: '#FFFFFF' };
    case 'light':
      return { bgColor: '#1c93e3', textColor: '#FFFFFF' };
    default:
      return { bgColor: '#1c93e3', textColor: '#FFFFFF' };
  }
};

type UseMainButtonArgs = {
  variant: MainButtonVariant;
  text: string;
  loading?: boolean;
  enabled?: boolean;
  callback: () => void;
};

export const useShowMainButton = ({
  variant,
  text,
  loading,
  enabled,
  callback,
}: UseMainButtonArgs) => {
  const mainButton = useMainButton();

  useEffect(() => {
    mainButton.show().enable();

    return () => {
      mainButton.hide();
    };
  }, []);

  useEffect(() => {
    mainButton.setParams({
      text,
      isEnabled: enabled,
      isLoaderVisible: loading,
      ...getPalleteByVariant(variant),
    });

    mainButton.on('click', callback);

    return () => {
      mainButton.off('click', callback);
    };
  }, [variant, text, loading, enabled, callback]);
};

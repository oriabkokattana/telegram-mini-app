import { useEffect } from 'react';
import { MainButtonParams, useMainButton } from '@telegram-apps/sdk-react';

export type MainButtonVariant = 'default' | 'disabled' | 'light' | 'dark';

const getPalleteByVariant = (
  variant: MainButtonVariant
): Pick<MainButtonParams, 'bgColor' | 'textColor'> => {
  switch (variant) {
    case 'default':
      return { bgColor: '#583BE8', textColor: '#FFFFFF' };
    case 'disabled':
      return { bgColor: '#6C5EB4', textColor: '#BDBDBD' };
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
  visible?: boolean;
  callback: () => void;
};

export const useShowMainButton = ({
  variant,
  text,
  loading,
  enabled,
  visible,
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
      isVisible: visible === undefined ? true : visible,
      ...getPalleteByVariant(variant),
    });

    mainButton.on('click', callback);

    return () => {
      mainButton.off('click', callback);
    };
  }, [variant, text, loading, enabled, visible, callback]);
};

import { useEffect } from 'react';
import { MainButtonParams, useMainButton } from '@telegram-apps/sdk-react';

export const useShowMainButton = (callback: () => void, params: Partial<MainButtonParams>) => {
  const mb = useMainButton();

  useEffect(() => {
    const abortController = new AbortController();

    const onMainButtonClick = () => {
      if (!abortController.signal.aborted) {
        callback();
        abortController.abort();
      }
    };

    mb.setParams(params).on('click', onMainButtonClick);

    return () => {
      mb.off('click', onMainButtonClick);
    };
  }, [callback, params]);

  useEffect(
    () => () => {
      mb.hide();
    },
    []
  );
};

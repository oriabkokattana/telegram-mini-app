import { useEffect } from 'react';
import { trackUserClosedTheApp } from '@/utils/amplitude-events';

const useTrackAppExit = () => {
  useEffect(() => {
    const handleBeforeUnload = () => {
      trackUserClosedTheApp();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    // Cleanup when component unmounts
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);
};

export default useTrackAppExit;

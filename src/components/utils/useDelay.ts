import { useEffect } from 'react';

export const useDelay = (callback = () => {}, delay = 1000) => {
  useEffect(() => {
    const tid = setTimeout(() => {
      callback();
    }, delay);
    return () => clearInterval(tid);
  }, [delay, callback]);
};

import { useEffect, useRef, useState } from 'react';

export const useTimeout = (
  callback = () => {},
  wakeUp = true,
  timeout = 1000
) => {
  const [isRunning, setIsRunning] = useState(false);
  const ref = useRef<() => void>();

  // wakeUp morpheus
  useEffect(() => {
    if (wakeUp && !isRunning) {
      ref.current = callback;
      setIsRunning(true);
    }
  }, [wakeUp, isRunning, callback]);

  // a tick timer that runs callback
  useEffect(() => {
    if (isRunning) {
      const tid = setTimeout(() => {
        ref.current && ref.current();
        setIsRunning(false);
      }, timeout);
      return () => clearInterval(tid);
    }
  }, [isRunning, timeout]);
};

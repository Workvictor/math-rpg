import { useEffect, useRef, useState } from 'react';

export const useTimeout = (
  callback = () => {},
  wakeUp = true,
  timeout = 1000
) => {
  const [isRunning, setIsRunning] = useState(false);
  const tmidRef = useRef<number>();
  const ref = useRef<() => void>();

  useEffect(() => {
    return () => clearInterval(tmidRef.current);
  }, []);

  // wakeUp morpheus
  useEffect(() => {
    if (wakeUp && !isRunning) {
      ref.current = callback;
      setIsRunning(true);
    }
  }, [wakeUp, isRunning, callback]);

  // a tick timer that runs callback
  useEffect(() => {
    if (isRunning && wakeUp) {
      tmidRef.current = setTimeout(() => {
        ref.current && ref.current();
        setIsRunning(false);
      }, timeout);
    }
  }, [isRunning, timeout, wakeUp]);
};

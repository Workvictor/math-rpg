import { useEffect, useState } from 'react';

export const useTimer = (wakeUp = true, timeout = 1000) => {
  const [timer, setTimer] = useState(Date.now());
  useEffect(() => {
    if (wakeUp && timer <= Date.now()) {
      const tid = setTimeout(() => setTimer(Date.now()), timeout);
      return () => clearInterval(tid);
    }
  }, [wakeUp, timeout, timer]);

  useEffect(() => {
    if (!wakeUp) {
      setTimer(Date.now());
    }
  }, [wakeUp]);

  return { timer };
};

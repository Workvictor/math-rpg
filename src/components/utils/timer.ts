import { useEffect, useState } from 'react';

export const useTimer = ({ timeout = 1000, wakeUp = true }) => {
  const [timer, setTimer] = useState(Date.now());
  useEffect(() => {
    if (wakeUp && timer <= Date.now()) {
      const tid = setTimeout(() => setTimer(Date.now()), timeout);
      return () => clearInterval(tid);
    }
  }, [wakeUp, timeout, timer]);
  return { timer };
};

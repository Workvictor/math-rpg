import React, { FC, useEffect } from 'react';

import { usePlayerDispatcher } from '../Player/PlayerContext';

interface IProps {
  amount: number;
}

export const Gold: FC<IProps> = props => {
  const { amount } = props;
  const playerDispatch = usePlayerDispatcher();

  useEffect(() => {
    return () => {
      playerDispatch({
        type: 'PickGold',
        amount
      });
    };
  }, [amount, playerDispatch]);

  return <div>{amount}</div>;
};

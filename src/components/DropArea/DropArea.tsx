import React, { FC } from 'react';

import styles from './styles.module.scss';
import { Gold } from '../Loot/Gold';
import { LootFrame } from '../Loot/LootFrame';

interface IProps {
  goldLoot: { index: number; amount: number }[];
  onGoldUnmount: (index: number) => void;
}

export const DropArea: FC<IProps> = props => {
  const { onGoldUnmount, goldLoot } = props;

  return (
    <div className={styles.wrapper}>
      {goldLoot.map(i => (
        <LootFrame
          type={'gold'}
          onUnmount={onGoldUnmount}
          index={i.index}
          key={i.index}
        >
          <Gold amount={i.amount} />
        </LootFrame>
      ))}
    </div>
  );
};

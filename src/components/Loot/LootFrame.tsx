import React, { FC, memo, useEffect, useState } from 'react';

import { useGameDispatcher } from '../Game/GameContext';
import { Animator } from '../animation/Animator';
import { classJoin } from '../utils/classJoin';
import styles from './styles.module.scss';

interface IProps {
  index: number;
  type: 'gold';
  className?: string;
  onUnmount?: (index: number) => void;
}

export const LootFrame: FC<IProps> = memo(props => {
  const gameDispatch = useGameDispatcher();

  const [isPicked, setIsPicked] = useState(false);

  // autoPick
  useEffect(() => {
    const tmid = setTimeout(() => {
      setIsPicked(true);
    }, 5000);
    return () => {
      clearTimeout(tmid);
    };
  }, []);

  const onPickByPlayer = () => {
    gameDispatch({
      type: 'addClickCount'
    });
    setIsPicked(true);
  };

  const onUnmount = () => {
    props.onUnmount && props.onUnmount(props.index);
  };

  return (
    <Animator animationName={'drop'} animationDelay={100}>
      <Animator
        animationName={'fadeOut'}
        play={isPicked}
        onAnimationEnd={onUnmount}
      >
        <div
          onClick={onPickByPlayer}
          className={classJoin([
            styles[props.type],
            isPicked && styles.collapsed,
            styles.wrapper,
            props.className
          ])}
        >
          {props.children}
        </div>
      </Animator>
    </Animator>
  );
});

import React, { FC, useState } from 'react';

import animation from './animation.module.scss';
import { classJoin } from '../utils/classJoin';

interface IProps {
  animationName:
    | 'bounce'
    | 'slideInRight'
    | 'slideOutRight'
    | 'shake'
    | 'drop'
    | 'fadeOut';
  play?: boolean;
  animationDelay?: number;
  onAnimationEnd?: () => void;
  className?: string;
}

export const Animator: FC<IProps> = props => {
  const { play = true, animationDelay = 0 } = props;

  const [animated, setAnimated] = useState(false);

  const onAnimationEnd = () => {
    setAnimated(true);
    if (props.onAnimationEnd) {
      props.onAnimationEnd();
    }
  };

  const style = {
    animationDelay: `${animationDelay}ms`
  };

  const className = classJoin([
    play && animation[props.animationName],
    animated && animation.static,
    props.className
  ]);

  return (
    <div style={style} className={className} onAnimationEnd={onAnimationEnd}>
      {props.children}
    </div>
  );
};

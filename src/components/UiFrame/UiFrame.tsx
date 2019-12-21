import React, { FC } from 'react';

import styles from './styles.module.scss';
import { classJoin } from '../utils/classJoin';

interface IProps {
  className?: string;
  onClick?: () => void;
}

export const UiFrame: FC<IProps> = props => {
  const { className, ...rest } = props;
  const uiFrame = classJoin([className, styles.uiFrame]);
  return (
    <div className={uiFrame} {...rest}>
      {props.children}
    </div>
  );
};

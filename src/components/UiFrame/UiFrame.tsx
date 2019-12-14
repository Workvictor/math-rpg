import React, { FC } from 'react';

import styles from './styles.module.scss';
import { classJoin } from '../utils/classJoin';

interface IProps {
  className?: string;
}

export const UiFrame: FC<IProps> = props => {
  const uiFrame = classJoin([props.className, styles.uiFrame]);
  return <div className={uiFrame}>{props.children}</div>;
};

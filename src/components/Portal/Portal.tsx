import React, { FC, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

import styles from './styles.module.scss';

export const Portal: FC = props => {
  const ref = useRef<HTMLDivElement>();
  useEffect(() => {
    ref.current = document.createElement('div');
    document.body.appendChild(ref.current);
    return () => {
      ref.current && document.body.removeChild(ref.current);
    };
  }, []);
  return ref.current
    ? ReactDOM.createPortal(
        <div className={styles.portal}>{props.children}</div>,
        ref.current
      )
    : null;
};

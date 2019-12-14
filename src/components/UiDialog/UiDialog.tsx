import React, { FC, ReactNode } from 'react';

import { Button, IconButton } from '../Button';
import { Icon } from '../Icon';
import { Divider } from '../layout/Divider';
import styles from './styles.module.scss';
import { UiFrame } from '../UiFrame';

interface IDialogProps {
  title?: ReactNode;
  onClose?: () => void;
  onSubmit?: () => void;
  className?: string;
}

export const UiDialog: FC<IDialogProps> = props => {
  return (
    <UiFrame className={props.className}>
      <div className={styles.title}>
        {props.title}
        <IconButton onClick={props.onClose} className={styles.closeButton}>
          <Icon type={'cancel'} />
        </IconButton>
      </div>
      <Divider />
      <div className={styles.body}>{props.children}</div>
      <Divider />
      <div className={styles.footer}>
        <Button onClick={props.onClose}>cancel</Button>
        <Button onClick={props.onSubmit}>ok</Button>
      </div>
    </UiFrame>
  );
};

import React, { FC, ReactNode, useEffect, useState } from 'react';

import { Portal } from '../Portal';
import styles from './styles.module.scss';
import { UiDialog } from '../UiDialog';

interface IModalProps {
  title?: ReactNode;
  modalIsOpen?: boolean;
  onClose?: () => void;
  onSubmit?: () => void;
  className?: string;
}

export const Modal: FC<IModalProps> = props => {
  const [isMounted, setIsMounted] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [animation, setAnimation] = useState<string>('');

  const onSubmit = () => {
    setIsSubmitted(true);
    handleClose();
  };

  const handleClose = () => {
    if (props.onClose) {
      props.onClose();
    } else {
      setAnimation(styles.hide);
    }
  };

  useEffect(() => {
    if (props.modalIsOpen && !isMounted) {
      setIsMounted(true);
    }
    if (!props.modalIsOpen && isMounted) {
      setAnimation(styles.hide);
    }
  }, [props.modalIsOpen, isMounted]);

  useEffect(() => {
    if (isMounted && animation === '') {
      setAnimation(styles.show);
    }
  }, [animation, isMounted]);

  const onAnimationEnd = () => {
    if (animation === styles.show && isMounted) {
      setAnimation(styles.static);
    }
    if (animation === styles.hide) {
      setAnimation('');
      setIsMounted(false);
      if (isSubmitted && props.onSubmit) {
        props.onSubmit();
      }
    }
  };

  const dialogStyles = [styles.dialog, animation].join(' ');

  return isMounted ? (
    <Portal>
      <div className={styles.backdrop} onClick={handleClose} />
      <div className={dialogStyles} onAnimationEnd={onAnimationEnd}>
        <UiDialog
          className={props.className}
          title={props.title}
          onClose={handleClose}
          onSubmit={onSubmit}
        >
          {props.children}
        </UiDialog>
      </div>
    </Portal>
  ) : null;
};

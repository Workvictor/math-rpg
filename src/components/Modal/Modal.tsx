import React, { FC, ReactNode, useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';

import { Portal } from '../Portal';
import { FlexBetween, Padbox, UIBlockInner } from '../layout';
import { Button, IconButton } from '../Button';
import { Icon } from '../Icon';
import { Divider } from '../layout/Divider';

const show = keyframes`
  0% {
    opacity: 0;
    transform: translate(-50%, 100%) scale(0.2);
  }
  100% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
`;

const hide = keyframes`
  0% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
  100% {
    opacity: 0;
    transform: translate(-50%, 100%) scale(0.2);
  }
`;

const Backdrop = styled.div`
  position: fixed;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.75);
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const Title = styled.div`
  padding: 0 16px 0 0;
  font-size: 18px;
  color: ${p => p.theme.colors.goldenrod};
`;

const StyledClose = styled(IconButton)`
  position: absolute;
  top: -4px;
  right: -4px;
`;

const Window = styled(Backdrop)`
  background-color: transparent;
  overflow: initial;
  padding: 6px;
  top: 50%;
  left: 50%;
  max-width: 375px;
  height: auto;
  transform: translate(-50%, -50%);
  &.show {
    animation: 300ms ${show};
  }
  &.hide {
    animation: 300ms ${hide};
  }
`;

interface IModalProps {
  title?: ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
  onSubmit?: () => void;
  className?: string;
}

export const Modal: FC<IModalProps> = props => {
  const [isAnimated, setIsAnimated] = useState(false);

  const [isCloseRequested, setIsCloseRequested] = useState(false);

  const [isSubmitted, setIsSubmitted] = useState(false);

  const onAnimationEnd = () => {
    if (!props.isOpen) {
      setIsAnimated(false);
    }
    if (isSubmitted && props.onSubmit) {
      props.onSubmit();
    }
  };

  const onSubmit = () => {
    setIsSubmitted(true);
    if (props.onClose) {
      props.onClose();
    }
  };

  useEffect(() => {
    if (props.isOpen) {
      setIsAnimated(true);
    }
    if (!props.isOpen) {
      setIsCloseRequested(true);
    }
  }, [props.isOpen]);

  const animationShow = props.isOpen && isAnimated ? 'show' : '';
  const animationHide = isCloseRequested ? 'hide' : '';

  return isAnimated ? (
    <Portal>
      <Backdrop onClick={props.onClose} />
      <Window
        onAnimationEnd={onAnimationEnd}
        className={animationShow || animationHide}
      >
        <UIBlockInner className={props.className}>
          <FlexBetween>
            <Title>{props.title}</Title>
            <StyledClose onClick={props.onClose}>
              <Icon type={'cancel'} />
            </StyledClose>
          </FlexBetween>
          <Divider />
          <Padbox>{props.children}</Padbox>
          <Divider />
          <FlexBetween>
            <Button onClick={props.onClose}>cancel</Button>
            <Button onClick={onSubmit}>ok</Button>
          </FlexBetween>
        </UIBlockInner>
      </Window>
    </Portal>
  ) : null;
};

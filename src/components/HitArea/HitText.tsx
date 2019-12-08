import React, { FC } from 'react';
import styled, { keyframes } from 'styled-components';

const anim = keyframes`
  0% {
    transform: translate(-50%, -50%) scale(1);
  }
  100% {
    transform: translate(-50%, -300%) scale(1.75);
  }
`;

const Hit = styled.div`
  font-size: 18px;
  top: 50%;
  left: 50%;
  position: absolute;
  transform: translate(-50%, -50%) scale(1);
  padding: 4px;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: 1s ${anim};
`;

export const HitText: FC<{
  id: number;
  onAnimationEnd: (id: number) => void;
}> = props => {
  const { id, children, onAnimationEnd } = props;

  const onEnd = () => {
    onAnimationEnd(id);
  };

  return <Hit onAnimationEnd={onEnd}>{children}</Hit>;
};

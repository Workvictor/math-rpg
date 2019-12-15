import React, { FC } from 'react';

import styled, { keyframes } from 'styled-components';
import { useHitContext, useHitDispatcher } from './Context';
import { HitText } from './HitText';

const HitWrapper = styled.div`
  pointer-events: none;
  top: 0;
  left: 0;
  position: fixed;
`;

const animRipples = keyframes`
0% {
    opacity: 1;
    width: 32px;
    height: 32px;
  }
  100% {
    opacity: 0;
    width: 64px;
    height: 64px;
  }
`;

const Ripples = styled.div`
  opacity: 0;
  transform-origin: center;
  transform: translate(-50%, -50%);
  position: absolute;
  padding: 4px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: rgba(139, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  animation: 1s ${animRipples};
`;

export const HitArea: FC = () => {
  const state = useHitContext();
  const dispatch = useHitDispatcher();

  const onAnimationEnd = (id: number) => {
    dispatch({
      type: 'removeHit',
      id
    });
  };

  return (
    <HitWrapper>
      {state.map(({ id, pageX, pageY, value }) => (
        <Ripples
          key={id}
          style={{
            top: `${pageY}px`,
            left: `${pageX}px`
          }}
        >
          <HitText onAnimationEnd={onAnimationEnd} id={id}>
            {value}
          </HitText>
        </Ripples>
      ))}
    </HitWrapper>
  );
};

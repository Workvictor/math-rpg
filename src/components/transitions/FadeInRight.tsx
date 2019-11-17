import React from 'react';
import { Transition } from 'react-transition-group';
import { TransitionProps } from 'react-transition-group/Transition';
import { TransitionElement } from '../layout/TransitionElement';

const isInStatus = {
  entering: true,
  entered: true,
  exiting: false,
  exited: false,
  unmounted: false
};

export const FadeInRight = (props: TransitionProps) => {
  const { children, ...rest } = props;
  return (
    <Transition {...rest}>
      {state => (
        <TransitionElement
          className={isInStatus[state] ? 'animated fadeInRight' : ''}
          isIn={isInStatus[state]}
        >
          {children}
        </TransitionElement>
      )}
    </Transition>
  );
};

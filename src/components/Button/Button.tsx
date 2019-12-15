import React from 'react';
import styled from 'styled-components';
import { Howl } from 'howler';
import { useHistory } from 'react-router';

import { Border } from '../layout';
import { useGameContext, useGameDispatcher } from '../Game/GameContext';

const clickSound = new Howl({
  src: ['sfx/bookOpen.ogg'],
  volume: 0.5
});

const clickNavigation = new Howl({
  src: ['sfx/bookPlace1.ogg'],
  volume: 0.15
});

const healing = new Howl({
  src: ['sfx/healingFull.wav'],
  volume: 0.15
});

type ISoundType = 'click' | 'navigation' | 'healing';

const sound: { [key in ISoundType]: Howl } = {
  click: clickSound,
  navigation: clickNavigation,
  healing: healing
};

export const ButtonInner = styled.span`
  border-radius: 2px;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  line-height: 120%;
  font-size: inherit;
  padding: 1px 8px 3px;
  color: inherit;
  text-shadow: inherit;
  background-color: ${props => props.theme.colors.darkred100};
  box-shadow: inset 0 0 4px ${props => props.theme.colors.greenDark},
    inset 0 0 1px ${props => props.theme.colors.greenDark},
    inset 0 2px 0 ${props => props.theme.colors.darkred200},
    inset 0 -2px 0 ${props => props.theme.colors.darkred};
`;

const Wrapper = styled(Border)`
  box-shadow: inset 0 0 0 0 ${props => props.theme.colors.grey20},
    inset 0 0 0 1px ${props => props.theme.colors.grey15},
    inset 0 0 0 2px ${props => props.theme.colors.grey0},
    inset 0 0 5px ${props => props.theme.colors.grey0},
    0 0 0 1px ${props => props.theme.colors.grey0};
  position: relative;
  color: ${props => props.theme.colors.goldenrod};
  outline: none;
  cursor: unset;
  font-size: 14px;
  text-shadow: 0 1px 1px ${props => props.theme.colors.grey10};
  & ${ButtonInner} {
    filter: brightness(0.75);
  }
  &:hover ${ButtonInner} {
    filter: brightness(1);
  }
  :after {
    top: 2px;
    left: 2px;
    position: absolute;
    border-radius: 2px;
    pointer-events: none;
    content: '';
    width: calc(100% - 2px);
    height: calc(100% - 2px);
    box-shadow: inset 0 0 5px ${props => props.theme.colors.greenDark},
      inset 0 0 2px ${props => props.theme.colors.greenDark};
  }
  :active,
  &.active {
    color: ${props => props.theme.colors.goldenrod};
    :after {
      box-shadow: inset 0 0 4px 3px ${props => props.theme.colors.grey0};
    }
    ${ButtonInner} {
      transform: scale(0.98) translate(1px, 1px);
    }
  }
  &.disable {
    filter: grayscale(100);
  }
`;

export interface Interface {
  className?: string;
  soundType?: ISoundType;
  to?: string;
  navigation?: boolean;
  disable?: boolean;
  onClick?: () => void;
}

export const Button: React.FC<Interface> = props => {
  const {
    children,
    to = '',
    onClick,
    className,
    navigation,
    disable,
    soundType = 'click'
  } = props;
  const history = useHistory();
  const classNames = [className];

  const dispatch = useGameDispatcher();

  const active = window.location.pathname === to && navigation;

  const playSound = () => {
    if (!active && !disable) {
      sound[soundType].play();
    }
  };

  if (active) {
    classNames.push('active');
  }

  if (disable) {
    classNames.push('disable');
  }

  const onBtnClick = () => {
    onClick && onClick();
    if (to) {
      history.push(to);
    }
    dispatch({
      type: 'addClickCount'
    });
    playSound();
  };

  return (
    <Wrapper
      as="button"
      onClick={disable ? undefined : onBtnClick}
      className={classNames.join(' ')}
    >
      <ButtonInner>{children}</ButtonInner>
    </Wrapper>
  );
};

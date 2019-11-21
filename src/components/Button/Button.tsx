import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { Border } from '../layout';

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
  background-color: darkred;
  box-shadow: inset 0 0 4px #0c1919, inset 0 0 1px #0c1919,
    inset 0 2px 0 #bf0707, inset 0 -2px 0 #650303;
`;

const Wrapper = styled(Border)`
  position: relative;
  color: goldenrod;
  outline: none;
  cursor: unset;
  font-size: 14px;
  text-shadow: 0 1px 1px #080808;
  :after {
    top: 0;
    left: 0;
    position: absolute;
    border-radius: inherit;
    pointer-events: none;
    content: '';
    width: 100%;
    height: 100%;
    box-shadow: inset 0 0 5px #0c1919, inset 0 0 2px #0c1919;
  }
  :hover:after {
    box-shadow: inset 0 -6px 6px 0px rgba(255, 234, 74, 0.16);
  }
  :active,
  &.active {
    color: goldenrod;
    :after {
      box-shadow: inset 0 0 4px 3px #000000;
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
  to?: string;
  navigation?: boolean;
  disable?: boolean;
  onClick?: () => void;
}

export const Button: React.FC<Interface> = ({
  children,
  to = '',
  onClick,
  className,
  navigation,
  disable
}) => {
  const classNames = [className];

  if (window.location.pathname === to && navigation) {
    classNames.push('active');
  }

  if (disable) {
    classNames.push('disable');
  }

  return (
    <Wrapper
      as="button"
      onClick={disable ? undefined : onClick}
      className={classNames.join(' ')}
    >
      {!disable && to ? (
        <Link to={to}>
          <ButtonInner>{children}</ButtonInner>
        </Link>
      ) : (
        <ButtonInner>{children}</ButtonInner>
      )}
    </Wrapper>
  );
};

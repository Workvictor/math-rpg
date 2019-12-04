import React, { FC } from 'react';
import styled from 'styled-components';

import { ProgressBar, ProgressBarInner } from '../ProgressBar';
import { Flex } from '../layout';
import { IProgressBar } from '../ProgressBar/ProgressBar';

const Wrapper = styled(Flex)`
  position: relative;
  font-size: 12px;
  height: 10px;
`;

export interface ITextVisibility {
  textIsVisible?: boolean;
}

const Text = styled.div<ITextVisibility>`
  pointer-events: none;
  width: 100%;
  font-size: 1.25em;
  text-shadow: 1px 1px #000;
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: ${p => (p.textIsVisible ? 1 : 0)};
  ${Wrapper}:hover & {
    opacity: 1;
  }
`;

export enum EBarType {
  health = '#476f04',
  mana = '#345ba0',
  stamina = '#5d4200',
  experience = '#6e2c9a'
}

interface IBarType {
  barType: EBarType;
}

const StyledProgressBar = styled(ProgressBar)<IBarType>`
  height: 100%;
  & ${ProgressBarInner} {
    background-color: ${p => p.barType};
  }
`;

export interface IStatusBar extends IProgressBar, ITextVisibility {
  onClick?: () => void;
}

export const StatusBar: FC<IStatusBar & IBarType> = props => {
  const {
    max,
    value,
    children,
    barType,
    className,
    onClick,
    textIsVisible
  } = props;
  return (
    <Wrapper className={className} onClick={onClick}>
      {children}
      <Text textIsVisible={textIsVisible}>
        {value}/{max}
      </Text>
      <StyledProgressBar barType={barType} max={max} value={value} />
    </Wrapper>
  );
};

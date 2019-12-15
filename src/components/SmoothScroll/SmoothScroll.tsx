import React, { FC } from 'react';
import styled from 'styled-components';

import { ScrollArea } from '../layout';

export const ScrollAreaWrapper = styled.div`
  overflow: hidden;
  width: 100%;
  height: 100%;
  position: relative;
  border-radius: 4px;
  border: 1px solid ${props => props.theme.colors.grey30};
  border-bottom-color: ${props => props.theme.colors.grey40};
  &:after {
    content: '';
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    pointer-events: none;
    box-shadow: inset 0 0 8px #000000, inset 0 0 32px #000000,
      inset 0 0 12px #000000, inset 0 0 8px #000000;
  }
`;

export const SmoothScroll: FC = props => {
  return (
    <ScrollAreaWrapper>
      <ScrollArea>{props.children}</ScrollArea>
    </ScrollAreaWrapper>
  );
};

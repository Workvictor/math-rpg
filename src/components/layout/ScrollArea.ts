import styled from 'styled-components';

import { BorderInner } from '../layout';

export const ScrollArea = styled(BorderInner)`
  overflow: auto;
  &.horizontal {
    overflow-x: auto;
    overflow-y: hidden;
  }
  &.vertical {
    overflow-x: hidden;
    overflow-y: auto;
  }
  width: 100%;
  height: 100%;
  padding: 3px;
  &::-webkit-scrollbar-track {
    border-radius: 2px;
    background-color: ${props => props.theme.colors.grey10};
    border: 2px solid ${props => props.theme.colors.grey0};
  }
  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    background-color: ${props => props.theme.colors.grey10};
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 2px;
    background-color: #2a8fc1;
    border: 2px solid ${props => props.theme.colors.grey10};
  }
`;

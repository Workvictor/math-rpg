import styled from 'styled-components';

import { BorderInner } from '../layout';

export const ScrollArea = styled(BorderInner)`
  overflow-y: auto;
  overflow-x: hidden;
  width: 100%;
  height: 100%;
  padding: 0;
  &::-webkit-scrollbar-track {
    border-radius: 2px;
    background-color: ${props => props.theme.colors.grey10};
    border: 2px solid ${props => props.theme.colors.grey0};
  }
  &::-webkit-scrollbar {
    width: 8px;
    background-color: ${props => props.theme.colors.grey10};
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 2px;
    background-color: #142a35;
    border: 2px solid ${props => props.theme.colors.grey10};
  }
`;

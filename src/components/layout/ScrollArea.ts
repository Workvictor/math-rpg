import styled from 'styled-components';

import { BorderInner } from '../layout';

export const ScrollArea = styled(BorderInner)`
  overflow-y: auto;
  width: 100%;
  height: 100%;
  &::-webkit-scrollbar-track {
    border-radius: 2px;
    background-color: #080808;
    border: 2px solid #000000;
  }
  &::-webkit-scrollbar {
    width: 8px;
    background-color: #080808;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 2px;
    background-color: #142a35;
    border: 2px solid #080808;
  }
`;

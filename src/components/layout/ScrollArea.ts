import styled from 'styled-components';

import { BorderInner } from '../layout';

export const ScrollArea = styled(BorderInner)`
  overflow-y: auto;
  height: 100%;
  &::-webkit-scrollbar-track {
    -webkit-box-shadow: 0 0 1px rgb(255, 255, 255);
    border-radius: 2px;
    background-color: #080808;
  }
  &::-webkit-scrollbar {
    width: 6px;
    background-color: #080808;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 2px;
    -webkit-box-shadow: inset 0 0 5px rgb(0, 77, 119);
    background-color: #1a1a1a;
    border: 1px solid #080808;
  }
`;

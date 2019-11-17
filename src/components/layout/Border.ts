import styled from 'styled-components';
import { Frame } from './Frame';

export const Border = styled(Frame)`
  padding: 2px;
  border: 1px solid #171717;
  border-top-color: #2b2b2b;
  box-shadow: inset 0 0 0 0 #131313, inset 0 0 0 1px #0c0c0c,
    inset 0 0 0 2px #000000;
`;

import styled from 'styled-components';

import { Frame } from './Frame';
import { BorderInner } from './BorderInner';

export const Tab = styled(Frame.withComponent(BorderInner))`
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  display: inline-block;
  padding: 4px 4px 0 4px;
  left: 6px;
  position: relative;
  border-bottom: none;
  text-transform: capitalize;
`;

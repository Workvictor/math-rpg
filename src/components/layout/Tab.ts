import styled from 'styled-components';

import { Frame } from './Frame';
import { BorderInner } from './BorderInner';

export const Tab = styled(Frame.withComponent(BorderInner))`
  display: block;
  width: 100%;
  padding: 4px;
  position: relative;
  text-transform: capitalize;
`;

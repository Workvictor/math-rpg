import styled from 'styled-components';

import { Frame } from './Frame';
import { Padbox } from './Padbox';
import { Border } from './Border';

export const Tab = styled(Padbox.withComponent(Frame).withComponent(Border))`
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  display: inline-block;
  position: relative;
  top: -3px;
  border-top: none;
  text-transform: capitalize;
  margin-bottom: 16px;
  ${props => props.theme.bg.cssMarble}
`;

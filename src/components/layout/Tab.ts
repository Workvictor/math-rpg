import styled from 'styled-components';

import { Frame } from './Frame';
import { Border } from './Border';

export const Tab = styled(Frame.withComponent(Border))`
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  display: inline-block;
  position: relative;
  top: -4px;
  font-size: 14px;
  padding: 2px 4px;
  border-top: none;
  text-transform: capitalize;
  box-shadow: 0 2px 2px ${props => props.theme.colors.grey0};
  ${props => props.theme.bg.cssMarble}
`;

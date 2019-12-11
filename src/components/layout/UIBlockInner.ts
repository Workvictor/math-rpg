import styled from 'styled-components';

import { Border } from './Border';
import { Padbox } from './Padbox';

export const UIBlockInner = styled(Padbox.withComponent(Border))`
  width: 100%;
  position: relative;
  box-shadow: inset 0 0 0 0 ${props => props.theme.colors.grey20},
    inset 0 0 0 1px ${props => props.theme.colors.grey15},
    inset 0 0 0 2px ${props => props.theme.colors.grey0},
    0 3px 2px ${props => props.theme.colors.grey0};
`;

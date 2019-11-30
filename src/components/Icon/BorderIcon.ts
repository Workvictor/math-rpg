import styled from 'styled-components';

import { Border } from '../layout';
import { Icon } from './Icon';

export const BorderIcon = styled(Border.withComponent(Icon))`
  width: 38px;
  height: 38px;
  flex-shrink: 0;
  display: flex;
  color: ${props => props.theme.colors.grey60};
`;

import styled from 'styled-components';
import { Frame } from './Frame';

export const BorderInner = styled(Frame)`
  padding: 3px;
  border: 1px solid ${props => props.theme.colors.grey30};
  border-bottom-color: ${props => props.theme.colors.grey40};
  ${props => props.theme.shadows.borderInner}
`;

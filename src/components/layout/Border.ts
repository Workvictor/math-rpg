import styled from 'styled-components';
import { Frame } from './Frame';

export const Border = styled(Frame)`
  padding: 2px;
  border: 1px solid ${props => props.theme.colors.grey30};
  border-top-color: ${props => props.theme.colors.grey40};
  box-shadow: inset 0 0 0 0 ${props => props.theme.colors.grey20},
    inset 0 0 0 1px ${props => props.theme.colors.grey15},
    inset 0 0 0 2px ${props => props.theme.colors.grey0};
`;

export const BorderElevated = styled(Border)`
  padding: 2px;
  border: 1px solid ${props => props.theme.colors.grey30};
  border-top-color: ${props => props.theme.colors.grey40};
  box-shadow: inset 0 0 0 0 ${props => props.theme.colors.grey20},
    inset 0 0 0 1px ${props => props.theme.colors.grey15},
    inset 0 0 0 2px ${props => props.theme.colors.grey0},
    0 2px 2px ${props => props.theme.colors.grey0};
`;

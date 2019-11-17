import styled from 'styled-components';

interface Interface {
  isIn: boolean;
  transition?: number;
}

export const TransitionElement = styled.span<Interface>`
  position: relative;
  transition: all ${props => props.transition || 300}ms;
  opacity: ${props => (props.isIn ? 1 : 0)};
  right: ${props => (props.isIn ? '0%' : '-100%')};
`;

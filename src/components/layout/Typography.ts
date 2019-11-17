import styled from 'styled-components';

interface Interface {
  align?: 'center' | 'left' | 'right';
}

export const Typography = styled.div<Interface>`
  text-align: ${props => props.align};
`;

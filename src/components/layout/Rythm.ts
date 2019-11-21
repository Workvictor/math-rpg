import styled from 'styled-components';

export const Rythm = styled.div<{ r?: 1 | 2 | 3 }>`
  margin-bottom: ${({ r = 1 }) => r * 4}px;
  &:last-child {
    margin-bottom: 0;
  }
`;

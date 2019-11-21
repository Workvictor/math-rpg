import styled from 'styled-components';

interface ISize {
  size: 'small' | 'default' | 'large';
}

export const TextSize = styled.span<ISize>`
  font-size: ${props => {
    switch (props.size) {
      case 'small':
        return 10;
      case 'large':
        return 18;
      case 'default':
        return 16;
      default:
        return 'inherit';
    }
  }}px;
`;

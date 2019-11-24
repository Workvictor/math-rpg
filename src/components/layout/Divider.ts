import styled from 'styled-components';

export const Divider = styled.hr`
  margin: 6px 0;
  background-color: ${props => props.theme.colors.grey0};
  height: 2px;
  border: none;
  flex-shrink: 0;
`;

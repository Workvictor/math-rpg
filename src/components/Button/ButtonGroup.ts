import styled from 'styled-components';

export const ButtonGroup = styled.div`
  display: inline-block;
  background-color: ${props => props.theme.colors.grey0};
  border: 2px solid ${props => props.theme.colors.grey0};
  border-radius: 4px;
  box-shadow: 0 0 0 1px ${props => props.theme.colors.grey20};
  & > button {
    margin-right: 1px;
    &:last-child {
      margin-right: 0;
    }
  }
`;

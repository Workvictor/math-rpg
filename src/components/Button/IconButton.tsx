import React from 'react';
import styled from 'styled-components';

import { Button, ButtonInner } from './Button';

export const StyledButton = styled(Button)`
  font-size: inherit;
  color: ${({ theme }) => theme.colors.darkred300};
  &:hover {
    color: ${({ theme }) => theme.colors.goldenrod};
  }
  & ${ButtonInner} {
    padding: 2px;
  }
`;

export const IconButton: typeof Button = props => {
  const { children, ...rest } = props;
  return <StyledButton {...rest}>{children}</StyledButton>;
};

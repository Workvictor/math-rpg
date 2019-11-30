import React from 'react';
import styled from 'styled-components';

import { Button, ButtonInner, Interface as ButtonInterface } from './Button';
import { TIcon } from '../Icon/TIcon';
import { Icon } from '../Icon';

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

interface IIconButton extends ButtonInterface {
  type: TIcon;
}

export const IconButton = ({ type, ...buttonProps }: IIconButton) => (
  <StyledButton {...buttonProps}>
    <Icon type={type} />
  </StyledButton>
);

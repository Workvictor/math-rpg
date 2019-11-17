import React from 'react';
import styled from 'styled-components';

import { Button, ButtonInner, Interface as ButtonInterface } from './Button';
import { SvgIcon } from '../icons';
import { TIcon } from '../icons/TIcon';

export const StyledButton = styled(Button)`
  margin: 1px;
  width: 32px;
  height: 32px;
  font-size: 22px;
  color: #310000;
  &:hover {
    color: goldenrod;
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
    <SvgIcon type={type} />
  </StyledButton>
);

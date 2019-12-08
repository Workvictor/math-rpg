import React, { FC } from 'react';
import styled, { DefaultTheme } from 'styled-components';

import { FlexStart } from './Flex';

interface IColorProps {
  textColor?: keyof DefaultTheme['colors'];
}

const StyledText = styled(FlexStart)<IColorProps>`
  color: ${({ theme, textColor }) =>
    textColor ? theme.colors[textColor] : theme.colors.commonWhite};
`;

export const ColorText: FC<IColorProps> = props => {
  const { children, textColor } = props;
  return <StyledText textColor={textColor}>{children}</StyledText>;
};

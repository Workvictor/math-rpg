import React, { FC } from 'react';
import styled from 'styled-components';

interface IStyledProps {
  width?: string;
  fill?: string;
}

const StyledSvg = styled.svg<IStyledProps>`
  width: ${({ width = '1em' }) => width};
  flex-shrink: 0;
  flex-grow: 0;
  & > path {
    fill: transparent;
  }
  & > g {
    touch-action: none;
    transform: translate(0, 0);
    fill: ${({ fill = 'currentColor' }) => fill};
  }
`;

interface ISvgIconProps {
  className?: string;
}

export const SvgIcon: FC<ISvgIconProps & IStyledProps> = props => {
  const { children, ...rest } = props;
  return (
    <StyledSvg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      {...rest}
    >
      <path d="M0 0h512v512H0z" />
      <g>{children}</g>
    </StyledSvg>
  );
};

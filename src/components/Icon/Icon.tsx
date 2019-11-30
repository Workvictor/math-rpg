import React, { FC } from 'react';
import styled from 'styled-components';

import { icons } from './icons';
import { ISvgIcon } from './ISvgIcon';

const Wrapper = styled.svg`
  height: 1em;
  width: 1em;
  & > path {
    fill: transparent;
  }
  & > g {
    touch-action: none;
    transform: translate(0, 0);
    fill: currentColor;
  }
`;

export const Icon: FC<ISvgIcon> = ({ type, ...restProps }) => {
  const i = icons[type];
  return i ? (
    <Wrapper
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      {...restProps}
    >
      <path d="M0 0h512v512H0z" />
      <g>
        <path d={i.path} />
      </g>
    </Wrapper>
  ) : null;
};

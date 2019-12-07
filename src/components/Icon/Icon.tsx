import React, { FC } from 'react';
import styled, { css } from 'styled-components';

import { icons } from './icons';
import { ISvgIcon } from './ISvgIcon';

const Wrapper = styled.div<{ src: string }>`
  height: 1em;
  width: 1em;
  background: url(${p => p.src}) no-repeat center;
`;

export const Icon: FC<ISvgIcon> = ({ type, ...restProps }) => {
  const icon = icons[type];
  return icon ? (
    <Wrapper src={icon.data} />
  ) : null;
  // return icon ? (
  //   <Wrapper
  //     xmlns="http://www.w3.org/2000/svg"
  //     viewBox="0 0 512 512"
  //     {...restProps}
  //   >
  //     <path d="M0 0h512v512H0z" />
  //     <g>
  //       <path d={i.path} />
  //     </g>
  //   </Wrapper>
  // ) : null;
};

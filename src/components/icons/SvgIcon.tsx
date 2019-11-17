import React from 'react';

import { icon } from './icon';
import { TIcon } from './TIcon';

interface ISvgIcon {
  type: TIcon;
  color?: string;
  size?: string;
}

export const SvgIcon = ({
  color = 'currentColor',
  size = '1em',
  type
}: ISvgIcon) => {
  const style = { height: size, width: size };
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style={style}>
      <path d="M0 0h512v512H0z" fill="transparent" />
      <g
        className=""
        transform="translate(0,0)"
        style={{ touchAction: 'none' }}
      >
        <path d={icon[type]} fill={color} />
      </g>
    </svg>
  );
};

import React, { CSSProperties, FC } from 'react';

import { iconType, TIcons } from './icons';

interface IIcon {
  type: TIcons;
  className?: string;
  height?: CSSProperties['height'];
}

export const Icon: FC<IIcon> = props => {
  const { type, className, height } = props;
  const Component = iconType[type].component;
  return <Component className={className} height={height} />;
};

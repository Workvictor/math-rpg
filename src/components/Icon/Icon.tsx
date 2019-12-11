import React, { FC } from 'react';

import { iconType, TIcons } from './icons';

interface IIcon {
  type: TIcons;
  className?: string;
}

export const Icon: FC<IIcon> = props => {
  const { type, className } = props;
  const Component = iconType[type].component;
  return <Component className={className} />;
};

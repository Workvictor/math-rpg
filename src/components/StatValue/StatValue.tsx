import React, { FC } from 'react';

import { Icon } from '../Icon';
import layout from '../layout/layout.module.scss';
import colors from '../layout/colors.module.scss';
import { TIcons } from '../Icon/icons';
import { classJoin } from '../utils/classJoin';

interface IProps {
  value: number | string;
  icon: TIcons;
  colorType?: 'physical' | 'natural' | 'mental' | 'unusual';
  className?: string;
}

export const StatValue: FC<IProps> = props => {
  const { colorType } = props;
  const className = classJoin([
    layout.flexCenter,
    props.className,
    colors[colorType || 'physical']
  ]);
  return (
    <div className={className}>
      <Icon type={props.icon} className={layout.marginRight} /> {props.value}
    </div>
  );
};

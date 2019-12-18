import React, { FC } from 'react';

import { Icon } from '../Icon';
import layout from '../layout/layout.module.scss';
import { TIcons } from '../Icon/icons';
import { classJoin } from '../utils/classJoin';
import { EColorType, TextColor } from '../layout/TextColor';

interface IProps {
  value: number | string;
  icon: TIcons;
  colorType?:
    | EColorType.physical
    | EColorType.mental
    | EColorType.natural
    | EColorType.unusual;
  className?: string;
}

export const StatValue: FC<IProps> = props => {
  const { colorType } = props;
  const className = classJoin([layout.flexCenter, props.className]);
  return (
    <TextColor colorType={colorType || EColorType.physical}>
      <div className={className}>
        <Icon type={props.icon} className={layout.marginRight} /> {props.value}
      </div>
    </TextColor>
  );
};

import React, { FC, ReactElement } from 'react';

import colors from './colors.module.scss';
import { classJoin } from '../utils/classJoin';

export enum EColorType {
  physical = 'physical',
  natural = 'natural',
  mental = 'mental',
  unusual = 'unusual',
  green = 'green',
  goldenrod = 'goldenrod',
  darkred = 'darkred',
  grey = 'grey',
  black = 'black',
  white = 'white',
  health = 'health',
  mana = 'mana',
  stamina = 'stamina',
  void = 'void',
  blue = 'blue',
  purple = 'purple'
}

interface IProps {
  colorType: EColorType;
  children: ReactElement;
}

export const TextColor: FC<IProps> = props => {
  return React.cloneElement(props.children, {
    className: classJoin([
      colors[props.colorType],
      props.children.props.className
    ])
  });
};

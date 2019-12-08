import React from 'react';

import { EBarType, StatusBar } from './StatusBar';
import { ProgressBar } from '../ProgressBar';
import { Walk } from '../Icon/Walk';

export const StaminaBar: typeof ProgressBar = props => {
  return (
    <StatusBar
      shortName={'stam'}
      icon={<Walk />}
      {...props}
      barType={EBarType.stamina}
    />
  );
};

import React from 'react';

import { EBarType, StatusBar } from './StatusBar';
import { ProgressBar } from '../ProgressBar';
import { Electric } from '../Icon/Electric';

export const ManaBar: typeof ProgressBar = props => {
  return (
    <StatusBar
      shortName={'mana'}
      icon={<Electric />}
      {...props}
      barType={EBarType.mana}
    />
  );
};

import React, { FC } from 'react';

import { EBarType, StatusBar, IStatusBar } from './StatusBar';
import { Heart } from '../Icon/Heart';

export const HealthBar: FC<IStatusBar> = props => {
  return (
    <StatusBar
      shortName={'heap'}
      icon={<Heart />}
      {...props}
      barType={EBarType.health}
    />
  );
};

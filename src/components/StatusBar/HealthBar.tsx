import React, { FC } from 'react';

import { Icon } from '../Icon';
import { EBarType, StatusBar, IStatusBar } from './StatusBar';

export const HealthBar: FC<IStatusBar> = props => {
  return (
    <StatusBar {...props} barType={EBarType.health}>
      <Icon type={'heart'} />
    </StatusBar>
  );
};

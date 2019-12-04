import React from 'react';

import { Icon } from '../Icon';
import { EBarType, StatusBar } from './StatusBar';
import { ProgressBar } from '../ProgressBar';

export const StaminaBar: typeof ProgressBar = props => {
  return (
    <StatusBar {...props} barType={EBarType.stamina}>
      <Icon type={'walk'} />
    </StatusBar>
  );
};

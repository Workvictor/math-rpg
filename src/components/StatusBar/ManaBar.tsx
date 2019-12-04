import React from 'react';

import { Icon } from '../Icon';
import { EBarType, StatusBar } from './StatusBar';
import { ProgressBar } from '../ProgressBar';

export const ManaBar: typeof ProgressBar = props => {
  return (
    <StatusBar {...props} barType={EBarType.mana}>
      <Icon type={'electric'} />
    </StatusBar>
  );
};

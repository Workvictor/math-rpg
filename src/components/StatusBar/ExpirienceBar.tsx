import React from 'react';

import { EBarType, StatusBar } from './StatusBar';
import { ProgressBar } from '../ProgressBar';
import styled from 'styled-components';
import layout from '../layout/layout.module.scss';
import { classJoin } from '../utils/classJoin';

const Wrapper = styled(StatusBar)`
  height: 4px;
  font-size: 10px;
`;

export const ExperienceBar: typeof ProgressBar = props => {
  const classNameExp = classJoin([layout.marginRight, layout.caption]);
  return (
    <div className={layout.flexCenter}>
      <div className={classNameExp}>exp</div>
      <Wrapper
        className={layout.shrinkFull}
        {...props}
        barType={EBarType.experience}
      />
    </div>
  );
};

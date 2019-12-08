import React from 'react';

import { EBarType, StatusBar } from './StatusBar';
import { ProgressBar } from '../ProgressBar';
import styled from 'styled-components';

const Wrapper = styled(StatusBar)`
  height: 4px;
  font-size: 10px;
`;

export const ExperienceBar: typeof ProgressBar = props => {
  return <Wrapper {...props} barType={EBarType.experience} />;
};

import React, { FC } from 'react';
import styled from 'styled-components';

import { IconButton } from '../Button';
import { FlexStart, Tab } from '../layout';

const StyledIconButton = styled(IconButton)`
  width: 22px;
  height: 22px;
  font-size: 12px;
`;

interface ITabLabel {
  label: string;
  fromUrl?: string;
}

export const TabLabel: FC<ITabLabel> = props => {
  const { label, fromUrl } = props;

  return label ? (
    <FlexStart>
      <Tab>{label}</Tab>
      {fromUrl && <StyledIconButton to={fromUrl} type={'cancel'} />}
    </FlexStart>
  ) : null;
};

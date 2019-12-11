import React, { FC, ReactNode } from 'react';
import styled from 'styled-components';

import { FlexBetween, FlexStart, FullWidth, IconWrapper } from '../layout';
import { Divider } from '../layout/Divider';

const Aside = styled(IconWrapper)`
  margin-right: 8px;
  flex-shrink: 0;
`;

const StyledDivider = styled(Divider)`
  background: linear-gradient(
    to right,
    ${p => p.theme.colors.grey0} 20%,
    transparent 50%,
    transparent
  );
`;

export interface IEntityVisualBody {
  aside: ReactNode;
  title: ReactNode;
  level?: ReactNode;
}

export const EntityVisualBody: FC<IEntityVisualBody> = props => {
  const { aside, title, children, level } = props;
  return (
    <FullWidth>
      <FlexStart>
        <Aside>{aside}</Aside>
        <FullWidth>
          <FlexBetween>
            <div>{title}</div>
            <div>{level}</div>
          </FlexBetween>
          {children}
        </FullWidth>
      </FlexStart>
      <StyledDivider />
    </FullWidth>
  );
};

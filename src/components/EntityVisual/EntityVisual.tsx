import React, { FC, ReactNode } from 'react';
import styled from 'styled-components';

import { UIBlockInner } from '../layout';
import { EntityVisualBody } from '../EntityVisual';
import { IEntityVisualBody } from './EntityVisualBody';

const Wrapper = styled(UIBlockInner)`
  margin-bottom: 8px;
  &:last-child {
    margin-bottom: 0;
  }
`;

export interface IEntityVisual extends IEntityVisualBody {
  description?: ReactNode;
}

export const EntityVisual: FC<IEntityVisual> = props => {
  const { aside, title, children, description, level } = props;
  return (
    <Wrapper>
      <EntityVisualBody aside={aside} title={title} level={level}>
        {description}
      </EntityVisualBody>
      {children}
    </Wrapper>
  );
};

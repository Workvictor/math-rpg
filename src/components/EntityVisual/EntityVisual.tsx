import React, { FC, ReactNode } from 'react';
import styled, { keyframes } from 'styled-components';

import { UIBlockInner } from '../layout';
import { EntityVisualBody } from '../EntityVisual';
import { IEntityVisualBody } from './EntityVisualBody';

interface IWrapper {
  image?: string;
}

const show = keyframes`
  0% {
    opacity: 0;
    transform: translate(0, 100%);
  }
  100% {
    opacity: 1;
    transform: translate(0, 0);
  }
`;

const Wrapper = styled(UIBlockInner)<IWrapper>`
  margin-bottom: 8px;
  background-image: url(${p => p.image});
  background-size: auto 100%;
  background-repeat: no-repeat;
  background-position: top right;
  animation: 300ms ${show};
  &:last-child {
    margin-bottom: 0;
  }
`;

export interface IEntityVisual extends IEntityVisualBody, IWrapper {
  description?: ReactNode;
}

export const EntityVisual: FC<IEntityVisual> = props => {
  const { aside, title, children, description, level, image } = props;
  return (
    <Wrapper image={image}>
      <EntityVisualBody aside={aside} title={title} level={level}>
        {description}
      </EntityVisualBody>
      {children}
    </Wrapper>
  );
};

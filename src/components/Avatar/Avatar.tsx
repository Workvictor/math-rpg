import React, { FC, ReactNode } from 'react';
import styled from 'styled-components';

import { Border, BorderElevated } from '../layout';
import { Icon } from '../Icon';
import { TIcons } from '../Icon/icons';

interface IView {
  readonly size?: number;
}

export const Wrapper = styled(Border)<IView>`
  display: inline-flex;
  position: relative;
  flex-grow: 0;
  flex-shrink: 0;
  font-size: ${({ size = 56 }) => size}px;
  color: ${({ theme }) => theme.colors.grey65};
`;

export const AvatarInner = styled.div`
  position: absolute;
  font-size: 12px;
  color: ${p => p.theme.colors.goldenrod};
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  padding: inherit;
`;

const Level = styled(BorderElevated)`
  display: inline-flex;
  justify-content: center;
  min-width: 20px;
  padding: 2px;
  position: absolute;
  top: 50%;
  left: 0;
  transform: translate(-50%, -50%);
`;

interface IProps extends IView {
  className?: string;
  iconType: TIcons;
  level?: ReactNode;
}

export const Avatar: FC<IProps> = props => {
  const { size, className, children, iconType, level } = props;
  return (
    <Wrapper size={size} className={className}>
      <Icon type={iconType} />
      <AvatarInner>
        {level && <Level>{level}</Level>}
        {children}
      </AvatarInner>
    </Wrapper>
  );
};

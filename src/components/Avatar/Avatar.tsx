import styled from 'styled-components';
import { Border } from '../layout';
import React, { FC } from 'react';
import { CementShoes } from '../Icon/CementShoes';

interface IView {
  readonly size?: number;
}

export const Wrapper = styled(Border)<IView>`
  display: inline-flex;
  position: relative;
  flex-grow: 0;
  flex-shrink: 0;
  font-size: ${({ size = 64 }) => size}px;
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

interface IProps extends IView {
  className?: string;
}

export const Avatar: FC<IProps> = ({ size, className, children }) => {
  return (
    <Wrapper size={size} className={className}>
      <CementShoes />
      <AvatarInner>{children}</AvatarInner>
    </Wrapper>
  );
};

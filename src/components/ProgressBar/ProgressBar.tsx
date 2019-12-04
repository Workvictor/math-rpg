import React, { FC } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 10px;
  padding: 1px;
  border-radius: 4px;
  background-color: ${props => props.theme.colors.grey0};
  box-shadow: inset 0 -1px 0px rgba(255, 255, 255, 0.11),
    inset 0 1px 1px rgba(0, 0, 0, 0.67);
  overflow: visible;
`;

export const ProgressBarInner = styled.div.attrs<{ width: number }>(props => ({
  style: {
    width: `${Math.min(Math.max(0, props.width * 100), 100)}%`
  }
}))<{ width: number }>`
  transition: all 150ms;
  background-color: ${props => props.theme.colors.grey60};
  border-radius: inherit;
  height: 100%;
  box-shadow: inset 0 -1px 1px rgba(0, 0, 0, 0.35),
    inset 0 1px 1px rgba(255, 255, 255, 0.35);
`;

export interface IProgressBar {
  value: number;
  max: number;
  className?: string;
}

export const ProgressBar: FC<IProgressBar> = ({ value, max, className }) => {
  return (
    <Wrapper className={className}>
      <ProgressBarInner width={value / max} />
    </Wrapper>
  );
};

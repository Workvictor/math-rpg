import React from "react";
import styled from "styled-components";

import { Border } from "./layout/Border";

const Wrapper = styled(Border)`
  display: block;
  width: 100%;
  min-height: 14px;
  height: 14px;
  padding: 1px;
  border-radius: 6px;
  ${props => props.theme.bg.cssMarble};
  box-shadow: inset 0 0 0 rgba(255, 255, 255, 0.36);
  overflow: visible;
`;

const Inner = styled.div.attrs<{ width: number }>(props => ({
  style: {
    width: `${Math.min(Math.max(0, props.width * 100), 100)}%`
  }
}))<{ width: number }>`
  transition: all 150ms;
  background-color: #4b7504;
  border-radius: inherit;
  height: 100%;
  box-shadow: inset 0 0 5px rgb(0, 0, 0);
`;

interface Interface {
  value: number;
}

export const StatusBar = ({ value }: Interface) => {
  return (
    <Wrapper>
      <Inner width={value} />
    </Wrapper>
  );
};

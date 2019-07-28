import React from "react";
import styled from "styled-components";

import { Border, BorderInner } from "../Border";

const Wrapper = styled(Border)`
  width: 100%;
  margin-top: 3px;
  padding: 6px;
  ${props => props.theme.bg.cssMarble};
`;
const Inner = styled(BorderInner)`
  border: 1px solid #101110;
  box-shadow: inset 0 1px 14px #151515, 0 0 0 1px #000000;
`;

const Content = styled.div`
  padding: 1px 4px;
`;

const Avatar = styled(Border)`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: url(${props => props.theme.images.guard}) no-repeat center;
  background-size: cover;
`;

export const PlayerFrame = () => {
  return (
    <Wrapper>
      <Inner>
        <Avatar />
        <Content>Player Frame</Content>
      </Inner>
    </Wrapper>
  );
};

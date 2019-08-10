import React from "react";
import styled from "styled-components";

import { BorderInner, Padbox, Flex } from "../layout";
import { Backpack } from "../icons";
import { IconButton } from "../Button";

const Wrapper = styled(Padbox)`
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  display: flex;
`;

const WrapperInner = styled(BorderInner)`
  padding: 1px;
`;

const StyledFlex = styled(Flex)`
  justify-content: flex-end;
`;

export const Navbar = () => {
  return (
    <Wrapper>
      <WrapperInner>
        <StyledFlex>
          <IconButton>P</IconButton>
          <IconButton>
            <Backpack />
          </IconButton>
          <IconButton>M</IconButton>
          <IconButton>Q</IconButton>
          <IconButton>S</IconButton>
        </StyledFlex>
      </WrapperInner>
    </Wrapper>
  );
};

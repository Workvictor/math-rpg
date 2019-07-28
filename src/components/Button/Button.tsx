import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { Border } from "../Border";

const Inner = styled.span`
  position: relative;
  border-radius: inherit;
  display: flex;
  text-align: center;
  align-items: center;
  margin: 0 auto;
  justify-content: center;
  line-height: 120%;
  font-size: 14px;
  padding: 1px 8px 2px;
  color: goldenrod;
  text-shadow: 0 1px 1px #282c34;
  background-color: darkred;
  box-shadow: inset 0 0 4px #0c1919, inset 0 0 1px #0c1919,
    inset 0 2px 0 #bf0707, inset 0 -2px 0 #650303;
  :hover:after {
    box-shadow: inset 0 -4px 6px rgba(255, 234, 74, 0.29);
  }
  :after {
    position: absolute;
    border-radius: inherit;
    pointer-events: none;
    content: "";
    width: 100%;
    height: 100%;
  }
`;

export const Wrapper = styled(Border)`
  outline: none;
  cursor: pointer;
  margin: 4px;
  :active {
    ${Inner} {
      transform: scale(0.96);
      box-shadow: inset 0 0 5px #0c1919, inset 0 0 2px #0c1919;
      :hover:after {
        box-shadow: inset 0 -4px 6px rgba(255, 234, 74, 0.13);
      }
    }
  }
`;

export const Button: React.FC<{ to?: string }> = ({ children, to }) => {
  return (
    <Wrapper as="button">
      {to ? (
        <Link to={to}>
          <Inner>{children}</Inner>
        </Link>
      ) : (
        <Inner>{children}</Inner>
      )}
    </Wrapper>
  );
};

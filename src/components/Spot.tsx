import React from "react";
import styled from "styled-components";

import { Border } from "./layout/Border";
import { Vector } from "../utils/Vector";
import { MapPageContext } from "./MapPage";
import { Link } from "react-router-dom";

export interface INpc {
  position: Vector;
  name?: string;
}

export interface ISpot {
  position: Vector;
  name: string;
  id: string;
  src: string;
}

interface Coords {
  readonly x: number;
  readonly y: number;
}

const Wrapper = styled(Border)<{ position: Vector }>`
  transition: all 150ms;
  transform-origin: center;
  overflow: hidden;
  min-width: 64px;
  min-height: 64px;
  border-radius: 64px;
  padding: 0;
  position: absolute;
  left: ${({ position }) =>
    position.x > 1 ? `${position.x}px` : `${position.x * 100}%`};
  top: ${({ position }) =>
    position.y > 1 ? `${position.y}px` : `${position.y * 100}%`};
  background-color: rgba(51, 51, 51, 0.7);
  &:hover {
    filter: brightness(1.3);
  }
`;

const Mob = styled(Border)<{ src: string }>`
  position: absolute;
  width: 64px;
  height: 64px;
  margin-left: -1px;
  margin-top: -1px;
  border-radius: 64px;
  background: url(${({ src }) => src}) no-repeat center;
  background-size: cover;
`;

export const Spot = ({ src, position, name, id }: ISpot) => {
  const onClick = () => {
    mapPageContext.onSelect({
      name,
      position
    });
  };

  const mapPageContext = React.useContext(MapPageContext);

  return (
    <Wrapper position={position}>
      <Link to={"/map/" + id}>
        <Mob src={src} />
      </Link>
    </Wrapper>
  );
};

import React from "react";
import styled from "styled-components";

import { Border } from "./Border";
import { Vector } from "../utils/Vector";
import { MapPageContext } from "./MapPage";

export interface INpc {
  position: Vector;
  name?: string;
}

export interface ISpot {
  position: Vector;
  name: string;
  id: string;
}

interface Coords {
  readonly x: number;
  readonly y: number;
}

interface IProps extends Coords {
  readonly src: string;
}

const Wrapper = styled(Border)<Coords>`
  transition: all 150ms;
  transform-origin: center;
  overflow: hidden;
  min-width: 64px;
  min-height: 64px;
  border-radius: 64px;
  padding: 0;
  position: absolute;
  top: ${({ x }) => (x > 1 ? `${x}px` : `${x * 100}%`)};
  left: ${({ y }) => (y > 1 ? `${y}px` : `${y * 100}%`)};
  background-color: rgba(51, 51, 51, 0.7);
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

export const Spot = (props: IProps) => {
  const onClick = () => {
    mapPageContext.onSelect({
      name: "test",
      position: new Vector(props.x, props.y)
    });
  };

  const mapPageContext = React.useContext(MapPageContext);

  return (
    <Wrapper x={props.x} y={props.y} onClick={onClick}>
      <Mob src={props.src} />
    </Wrapper>
  );
};

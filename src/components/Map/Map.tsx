import React from "react";
import styled from "styled-components";

import { Vector } from "../../utils/Vector";
import { ElemEvent } from "../../utils/ElemEvent";
import { Viewport } from "../../utils/Viewport";
import kw from "./img/kobold-worker-xs.png";
import northshireMine from "./img/northshireMine.png";
import { Spot } from "../Spot";
import { Border } from "../layout/Border";

const Wrapper = styled(Border)`
  overflow: hidden;
  position: relative;
  width: 100%;
  height: 100%;
`;

interface Coords {
  readonly x: number;
  readonly y: number;
}

const Image = styled.div.attrs<Coords>(({ x, y }) => ({
  style: { top: `${y}px`, left: `${x}px` }
}))<Coords>`
  position: absolute;
`;

const Title = styled.div`
  position: absolute;
  left: 50%;
  top: 4px;
  transform: translateX(-50%);
  font-weight: 700;
  font-size: 16px;
  color: #c0aa29;
  text-shadow: 0 1px 1px #000;
  z-index: 2;
  padding: 4px;
  background-color: rgb(86, 56, 26);
  border: 4px solid rgb(109, 73, 35);
  border-top: none;
  box-shadow: inset 0 0 5px #333;
`;

export const Map = ({ map }: { map: { src: string; name: string } }) => {
  const [viewport, setViewport] = React.useState<Viewport>(new Viewport());
  const [mousePosition, setMousePosition] = React.useState<Vector>(Vector.zero);
  const [position, setPosition] = React.useState<Vector>(Vector.zero);
  const [picked, togglePicked] = React.useState<boolean>(false);

  const imgRef = React.useRef<HTMLImageElement>(null);

  const onMouseUp = (e: Event) => {
    e.preventDefault();
    togglePicked(false);
    window.removeEventListener("mouseup", onMouseUp);
  };

  const onMouseDown = ElemEvent.mouseEvent(e => {
    e.preventDefault();
    window.addEventListener("mouseup", onMouseUp);
    togglePicked(true);
    const vp = new Viewport(e.currentTarget.getBoundingClientRect());
    setViewport(vp);
    setMousePosition(ElemEvent.mouseClientVector(e).subtract(vp.from));
  });

  const onMouseMove = ElemEvent.mouseEvent(e => {
    e.preventDefault();
    if (picked && imgRef.current) {
      const { width, height } = imgRef.current;
      const nextMousePosition = ElemEvent.mouseClientVector(e).subtract(
        viewport.from
      );
      const desiredPosition = position.subtract(
        mousePosition.subtract(nextMousePosition)
      );
      const x = Math.max(
        Math.min(desiredPosition.x, 0),
        viewport.scrollX(width)
      );
      const y = Math.max(
        Math.min(desiredPosition.y, 0),
        viewport.scrollY(height)
      );
      setMousePosition(nextMousePosition);
      setPosition(new Vector(x, y));
    }
  });

  return (
    <Wrapper onMouseDown={onMouseDown} onMouseMove={onMouseMove}>
      <Title>{map.name}</Title>
      <Image x={position.x} y={position.y}>
        <img ref={imgRef} src={map.src} alt={map.name} />
        <Spot
          src={northshireMine}
          name={"Mine"}
          id={"northshireMine"}
          position={new Vector(0.25, 0.09)}
        />
      </Image>
    </Wrapper>
  );
};

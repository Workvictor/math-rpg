import React from "react";

export interface IIconProps {
  color?: string;
  size?: number;
}

interface ISvgIcon extends IIconProps {
  pathD: string;
}

export const SvgIcon = ({ color = "#fff", size = 32, pathD }: ISvgIcon) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    style={{ height: `${size}px`, width: `${size}px` }}
  >
    <path d="M0 0h512v512H0z" fill="transparent" fill-opacity="0" />
    <g className="" transform="translate(0,0)" style={{ touchAction: "none" }}>
      <path d={pathD} fill={color} fill-opacity="1" />
    </g>
  </svg>
);

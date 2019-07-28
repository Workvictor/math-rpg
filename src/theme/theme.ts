import "styled-components";
import { DefaultTheme, createGlobalStyle, css } from "styled-components";

import marble from "./img/UI-Background-Marble.png";
import rock from "./img/UI-Background-Rock.png";
import guard from "./img/guard.png";
import pointer from "./img/Point.png";

const images = {
  marble,
  guard,
  rock
};

const shadows = {
  blueGlow: "0 0 100px #1270a0, 1px 0 0px #2a556f, -1px 0 0px #2a556f",
  bodyGlow: "inset 0 0 50px rgba(13, 109, 160, 0.3)",
  textCommon: "0 1px 1px #000"
};

const colors = {
  blueAccent: "#1270a0",
  colden: "#c0aa29",
  grey: "#242424"
};

const bg = {
  cssMarble: css`
    background: ${colors.grey} url(${images.marble});
  `,
  cssRock: css`
    background: ${colors.grey} url(${images.rock});
  `
};

declare module "styled-components" {
  export interface DefaultTheme {
    colors: typeof colors;
    shadows: typeof shadows;
    images: typeof images;
    bg: typeof bg;
  }
}

export const theme: DefaultTheme = {
  colors,
  shadows,
  images,
  bg
};

export const AppGlobalStyle = createGlobalStyle`
  body {
    cursor: url(${pointer}) 0 0, auto;
    box-shadow: ${shadows.bodyGlow};
    font-size: 14px;
  }
`;

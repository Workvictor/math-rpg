import { createGlobalStyle } from 'styled-components';

import { shadows } from './shadows';
import { images } from './images';

export const AppGlobalStyle = createGlobalStyle`
  body {
    cursor: url(${images.pointer}) 0 0, auto;
    font-size: 14px;
    ${shadows.cssBodyGlow}
  }
`;

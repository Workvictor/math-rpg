import { css } from 'styled-components';

import { colors } from './colors';
import { images } from './images';

export const cssBackground = {
  cssMarble: css`
    background: ${colors.grey50} url(${images.marble});
  `,
  cssRock: css`
    background: ${colors.grey50} url(${images.rock});
  `
};

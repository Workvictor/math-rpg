import 'styled-components';
import { DefaultTheme } from 'styled-components';

import { colors } from './colors';
import { images } from './images';
import { shadows } from './shadows';
import { cssBackground } from './cssBackground';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: typeof colors;
    shadows: typeof shadows;
    images: typeof images;
    bg: typeof cssBackground;
  }
}

export const theme: DefaultTheme = {
  colors,
  shadows,
  images,
  bg: cssBackground
};

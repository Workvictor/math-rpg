import 'styled-components';
import { css } from 'styled-components';
import { colors } from './colors';

export const shadows = {
  cssBodyGlow: css`
    box-shadow: inset 0 0 50px rgba(13, 109, 160, 0.3);
  `,
  borderInner: css`
    box-shadow: inset 0 0 5px 2px ${colors.grey0},
      inset 0 0 20px 2px ${colors.grey0};
  `,
  uiBlockInner: css`
    box-shadow: 0 2px 2px ${colors.grey0};
  `,
  header: css`
    box-shadow: inset 0 0 30px ${colors.grey0}, inset 0 0 10px ${colors.grey0},
      inset 0 0 20px ${colors.grey0};
  `,
  cssBlueGlow: css`
    box-shadow: 0 0 100px ${colors.blueDark100}, 1px 0 0 ${colors.blueDark},
      -1px 0 0 ${colors.blueDark}, 0 1px 0 ${colors.blueDark},
      0 -1px 0 ${colors.blueDark};
  `
};

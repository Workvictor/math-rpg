import React, { lazy, Suspense } from 'react';
import { SvgIcon } from '../SvgIcon';

const Path = lazy(() => import('./Path'));

export const authorUrl = 'https://game-icons.net/1x1/lorc/compass.html';

export const Compass: typeof SvgIcon = props => (
  <Suspense fallback={<SvgIcon {...props} />}>
    <SvgIcon {...props}>
      <Path />
    </SvgIcon>
  </Suspense>
);

export default {
  authorUrl,
  component: Compass
};

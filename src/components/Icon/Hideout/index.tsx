import React, { lazy, Suspense } from 'react';
import { SvgIcon } from '../SvgIcon';

const Path = lazy(() => import('./Path'));

export const authorUrl =
  'https://game-icons.net/1x1/delapouite/dungeon-light.html';

export const Hideout: typeof SvgIcon = props => (
  <Suspense fallback={<SvgIcon {...props} />}>
    <SvgIcon {...props}>
      <Path />
    </SvgIcon>
  </Suspense>
);

export default {
  authorUrl,
  component: Hideout
};

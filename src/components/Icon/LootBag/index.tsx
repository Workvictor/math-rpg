import React, { lazy, Suspense } from 'react';
import { SvgIcon } from '../SvgIcon';

const Path = lazy(() => import('./Path'));

export const authorUrl = 'https://game-icons.net/1x1/lorc/swap-bag.html';

export const LootBag: typeof SvgIcon = props => (
  <Suspense fallback={<SvgIcon {...props} />}>
    <SvgIcon {...props}>
      <Path />
    </SvgIcon>
  </Suspense>
);

export default {
  authorUrl,
  component: LootBag
};

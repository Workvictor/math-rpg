import React, { lazy, Suspense } from 'react';
import { SvgIcon } from '../SvgIcon';

const Path = lazy(() => import('./Path'));

export const authorUrl =
  'https://game-icons.net/1x1/delapouite/entry-door.html';

export const EntryDoor: typeof SvgIcon = props => (
  <Suspense fallback={<SvgIcon {...props} />}>
    <SvgIcon {...props}>
      <Path />
    </SvgIcon>
  </Suspense>
);

export default {
  authorUrl,
  component: EntryDoor
};

import React, { lazy, Suspense } from 'react';

const Lazy = lazy(() => import('../LocationsPage'));

export const LocationSuspense = () => (
  <Suspense fallback={null}>
    <Lazy />
  </Suspense>
);

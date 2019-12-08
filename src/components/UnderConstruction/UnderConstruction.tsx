import React from 'react';

import { Padbox } from '../layout';
import { Barrier } from '../Icon/Barrier';

export const UnderConstruction = () => {
  return (
    <>
      <Padbox>В разработке</Padbox>
      <Padbox>
        <Barrier height={'32px'} />
      </Padbox>
    </>
  );
};

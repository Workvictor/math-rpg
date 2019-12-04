import React from 'react';

import { Padbox } from '../layout';
import { Avatar } from '../Avatar';

export const UnderConstruction = () => {
  return (
    <>
      <Padbox>В разработке</Padbox>
      <Padbox>
        <Avatar type={'barrier'} />
      </Padbox>
    </>
  );
};

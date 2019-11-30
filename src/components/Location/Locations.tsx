import React from 'react';

import { TabLabel } from '../TabLabel';
import { locations } from '../Game/world';
import { Padbox, ScrollArea, BorderInner } from '../layout';
import { Character } from '../Character';
import { Divider } from '../layout/Divider';
import { LocationListItem } from './LocationListItem';

export const Locations = () => {
  return (
    <>
      <TabLabel label={'Локации'} />
      <BorderInner>
        <Character />
        <Padbox>
          <Divider />
        </Padbox>
      </BorderInner>
      <Divider />
      <ScrollArea>
        {locations.map(l => (
          <LocationListItem key={l.id} location={l} />
        ))}
      </ScrollArea>
    </>
  );
};

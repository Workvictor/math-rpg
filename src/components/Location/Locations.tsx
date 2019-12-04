import React from 'react';

import { TabLabel } from '../TabLabel';
import { locations } from '../Game/world';
import { Padbox, ScrollArea, BorderInner } from '../layout';
import { Player } from '../Player';
import { Divider } from '../layout/Divider';
import { LocationListItem } from './LocationListItem';

export const Locations = () => {
  return (
    <>
      <TabLabel label={'Локации'} />
      <BorderInner>
        <Player />
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

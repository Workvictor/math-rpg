import React, { FC } from 'react';
import { Redirect, useRouteMatch } from 'react-router';

import { rooms, locations } from '../world/world';
import { Room } from './Room';
import { Button } from '../Button';
import { TabLabel } from '../TabLabel';

export const RoomCheck: FC = () => {
  const {
    params: { roomName, gameName, locationName }
  } = useRouteMatch<{
    locationName: string;
    roomName: string;
    gameName: string;
  }>();

  const room = rooms.find(item => item.name === roomName);

  return room ? (
    <>
      <Room room={room}>
        <TabLabel
          label={
            <>
              {room.name} [{room.levelRange.join('-')}]
            </>
          }
        >
          <Button to={`/${gameName}/locations/${locationName}`}>выход</Button>
        </TabLabel>
      </Room>
    </>
  ) : (
    <Redirect to={`/${gameName}/${locations[0].id}`} />
  );
};

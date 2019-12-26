import React from 'react';
import { useRouteMatch } from 'react-router';

import { TabLabel } from '../TabLabel';
import { Button } from '../Button';
import { IRoomRoute } from '../Room/Route';
import { rooms } from '../Room/rooms';

export const RoomTab = () => {
  const { params } = useRouteMatch<IRoomRoute>();
  const room = rooms.find(i => i.index === parseInt(params.roomIndex));

  return room ? (
    <TabLabel label={room.label}>
      <Button to={`/${params.gameName}/locations/${params.locationId}`}>
        выход
      </Button>
    </TabLabel>
  ) : null;
};

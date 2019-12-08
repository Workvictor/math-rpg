import React from 'react';
import { useRouteMatch } from 'react-router';

import { TabLabel } from '../TabLabel';
import { Button } from '../Button';
import { IRoomRoute } from '../Room/IRoomRoute';
import { room } from '../world/rooms';

export const RoomTab = () => {
  const { params } = useRouteMatch<IRoomRoute>();

  return params.roomName in room ? (
    <TabLabel label={room[params.roomName].label}>
      <Button to={`/${params.gameName}/locations/${params.locationId}`}>
        выход
      </Button>
    </TabLabel>
  ) : null;
};

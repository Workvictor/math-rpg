import React, { FC } from 'react';
import { Redirect, useRouteMatch } from 'react-router';

import { Room } from './Room';
import { IRoomRoute } from './IRoomRoute';
import { room } from '../world/rooms';
import { HitContextProvider } from '../HitArea/Context';
import { HitArea } from '../HitArea';

export const RoomRoute: FC = () => {
  const { params } = useRouteMatch<IRoomRoute>();
  return params.roomName in room ? (
    <HitContextProvider>
      <Room room={room[params.roomName]} />
      <HitArea />
    </HitContextProvider>
  ) : (
    <Redirect to={`/${params.gameName}/locations/${params.locationId}`} />
  );
};

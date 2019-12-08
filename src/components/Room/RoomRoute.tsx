import React, { FC } from 'react';
import { Redirect, useRouteMatch } from 'react-router';

import { Room } from './Room';
import { IRoomRoute } from './IRoomRoute';
import { room } from '../world/rooms';

export const RoomRoute: FC = () => {
  const { params } = useRouteMatch<IRoomRoute>();
  return params.roomName in room ? (
    <Room room={room[params.roomName]} />
  ) : (
    <Redirect to={`/${params.gameName}/locations/${params.locationId}`} />
  );
};

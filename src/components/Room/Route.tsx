import React, { FC, memo } from 'react';
import { Redirect, useRouteMatch } from 'react-router';

import { RoomView } from './RoomView';
import { HitContextProvider } from '../HitArea/Context';
import { HitArea } from '../HitArea';
import { ILocationRoute } from '../Location/ILocationRoute';
import { rooms } from './rooms';

export interface IRoomRoute extends ILocationRoute {
  roomIndex: string;
}

export const Route: FC = memo(() => {
  const { params } = useRouteMatch<IRoomRoute>();

  const room = rooms.find(i => i.index === parseInt(params.roomIndex));

  return room ? (
    <HitContextProvider>
      <RoomView {...room} />
      <HitArea />
    </HitContextProvider>
  ) : (
    <Redirect to={`/${params.gameName}/locations/${params.locationId}`} />
  );
});

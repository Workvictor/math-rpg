import React, { FC, useEffect } from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router';

import { locations } from '../world/world';
import { Route as RoomRoute } from '../Room/Route';
import { ILocationRoute } from './ILocationRoute';
import { usePlayerDispatcher } from '../Player/PlayerContext';
import { AreaRestore } from '../AreaRestore';
import { SmoothScroll } from '../SmoothScroll';
import { RoomCard } from './RoomCard';

export const Location: FC = () => {
  const { params, path } = useRouteMatch<ILocationRoute>();

  const dispatch = usePlayerDispatcher();
  const locationId = parseInt(params.locationId);

  useEffect(() => {
    dispatch({
      type: 'ChangeLocation',
      locationId
    });
  }, [dispatch, locationId]);

  const location = locations.find(i => i.id === locationId);

  return location ? (
    <Switch>
      <Route exact path={path}>
        <AreaRestore />
        <SmoothScroll>
          {location.rooms.map(room => {
            return <RoomCard key={room.index} {...room} />;
          })}
        </SmoothScroll>
      </Route>

      <Route exact path={`${path}/:roomIndex`}>
        <RoomRoute />
      </Route>

      <Redirect to={`/${params.gameName}/locations/${params.locationId}`} />
    </Switch>
  ) : (
    <Redirect to={`/${params.gameName}/locations`} />
  );
};

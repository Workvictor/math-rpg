import React, { FC, useEffect } from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router';

import { locations } from '../world/world';
import { RoomRoute } from '../Room/RoomRoute';
import { ILocationRoute } from './ILocationRoute';
import { usePlayerDispatcher } from '../Player/PlayerContext';
import { AreaRestore } from '../AreaRestore';
import { SmoothScroll } from '../SmoothScroll';
import { RoomCard } from './RoomCard';
import { usePlayerSelector } from '../Player/usePlayerSelector';

export const Location: FC = () => {
  const { params, path } = useRouteMatch<ILocationRoute>();
  const player = usePlayerSelector();
  const dispatch = usePlayerDispatcher();
  const locationId = parseInt(params.locationId);

  useEffect(() => {
    if (player.currentLocationId !== locationId) {
      dispatch({
        type: 'ChangeLocation',
        locationId
      });
    }
  }, [dispatch, locationId, player.currentLocationId]);

  const location = locations.find(i => i.id === locationId);

  return location ? (
    <Switch>
      <Route exact path={path}>
        <AreaRestore />
        <SmoothScroll>
          {location.rooms.map(({ room, id }) => {
            return (
              <RoomCard
                locationId={params.locationId}
                key={id}
                room={room}
                index={id}
              />
            );
          })}
        </SmoothScroll>
      </Route>

      <Route exact path={`${path}/:roomName`}>
        <RoomRoute />
      </Route>

      <Redirect to={`/${params.gameName}/locations/${params.locationId}`} />
    </Switch>
  ) : (
    <Redirect to={`/${params.gameName}/locations`} />
  );
};

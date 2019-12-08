import React, { FC, useEffect } from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router';

import { locations } from '../world/world';
import { ScrollArea } from '../layout';
import { RoomRoute } from '../Room/RoomRoute';
import { AreaEntity } from '../AreaEntity';
import { ILocationRoute } from './ILocationRoute';
import { usePlayerContext } from '../Player/PlayerContext';
import { AreaRestore } from '../AreaRestore';

export const Location: FC = () => {
  const { params, path } = useRouteMatch<ILocationRoute>();
  const { state: player, dispatch } = usePlayerContext();
  const locationId = parseInt(params.locationId);

  useEffect(() => {
    if (player.location !== locationId) {
      dispatch({
        type: 'changeLocation',
        locationId
      });
    }
  }, [dispatch, locationId, player.location]);

  const location = locations.find(i => i.id === locationId);

  return location ? (
    <Switch>
      <Route exact path={path}>
        <AreaRestore />
        <ScrollArea>
          {location.rooms.map(room => {
            return (
              <AreaEntity
                key={room.name}
                aside={room.icon}
                title={room.label}
                description={room.description}
                level={room.level}
                locked={!player.unlockedRoomNames.includes(room.name)}
                to={`${location.id}/${room.name}`}
              />
            );
          })}
        </ScrollArea>
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

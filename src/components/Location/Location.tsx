import React, { FC, useEffect } from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router';

import { locations } from '../world/world';
import { Rythm, ScrollArea } from '../layout';
import { RoomRoute } from '../Room/RoomRoute';
import { AreaEntity } from '../AreaEntity';
import { ILocationRoute } from './ILocationRoute';
import { usePlayerContext, usePlayerDispatcher } from '../Player/PlayerContext';
import { AreaRestore } from '../AreaRestore';
import { clobs } from '../world/clobs';
import { GoalList } from '../GoalList';
import { Animator } from '../animation/Animator';

export const Location: FC = () => {
  const { params, path } = useRouteMatch<ILocationRoute>();
  const { state: player } = usePlayerContext();
  const dispatch = usePlayerDispatcher();
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
          {location.rooms.map((room, index) => {
            return (
              <Rythm r={2} key={room.name}>
                <Animator animationName={'bounce'} animationDelay={index * 200}>
                  <AreaEntity
                    aside={room.icon}
                    title={room.label}
                    description={
                      <>
                        <GoalList
                          title={'Задания:'}
                          items={room.goals.map(i => ({
                            label: `убить [${clobs[i.clobType].label}]`,
                            count: i.count
                          }))}
                        />
                      </>
                    }
                    level={room.level}
                    locked={!player.unlockedRoomNames.includes(room.name)}
                    to={`${location.id}/${room.name}`}
                  />
                </Animator>
              </Rythm>
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

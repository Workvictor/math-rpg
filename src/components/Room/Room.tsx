import React, { FC, useEffect, useRef, useState } from 'react';

import { Rythm, ScrollArea, UIBlockInner } from '../layout';
import { ClickableObject } from '../ClickableObject';
import { HitArea } from '../HitArea';
import { HitContextProvider } from '../HitArea/Context';
import { usePlayerContext } from '../Player/PlayerContext';
import { Clob } from '../world/Clob';
import { spreadRange } from '../utils/spreadRange';
import { RoomModel } from '../world/RoomModel';
import { room } from '../world/rooms';
import { locations } from '../world/world';
import { Button } from '../Button';
import { useRouteMatch } from 'react-router';
import { IRoomRoute } from './IRoomRoute';
import { fillByChance } from '../utils/fillByChance';
import { clobs } from '../world/clobs';

export const Room: FC<{ room: RoomModel }> = props => {
  const {
    clobsCount,
    level,
    clobsTypes,
    nextLocationId,
    nextRoom,
    objects: rObjs
  } = props.room;

  const firstTimeUnlockLocation = useRef<boolean>();
  const firstTimeUnlockRoom = useRef<boolean>();

  const { params } = useRouteMatch<IRoomRoute>();

  const { dispatch, state: player } = usePlayerContext();

  const [killCount, setKillCount] = useState(0);
  const [killCountMax, setKillCountMax] = useState(1);
  const [objects, setObjects] = useState<{ key: number; clob: Clob }[]>([]);

  useEffect(() => {
    if (!firstTimeUnlockLocation.current && nextLocationId) {
      firstTimeUnlockLocation.current = !player.unlockedLocations.includes(
        nextLocationId
      );
    }
  }, [nextLocationId, player.unlockedLocations]);

  useEffect(() => {
    if (!firstTimeUnlockRoom.current && nextRoom) {
      firstTimeUnlockRoom.current = !player.unlockedRoomNames.includes(
        nextRoom
      );
    }
  }, [nextRoom, player.unlockedRoomNames]);

  useEffect(() => {
    const clobTypeTable = fillByChance(
      spreadRange(clobsCount),
      rObjs.map(({ chance, clobType: item }) => ({ chance, item }))
    ).map((type, key) => ({ key, clob: clobs[type] }));

    setKillCount(0);
    setKillCountMax(clobTypeTable.length);
    setObjects(clobTypeTable);
  }, [clobsCount, clobsTypes, level]);

  const clear = () => {
    //TODO add notify before reload
    setKillCount(0);
    setKillCountMax(1);
    setObjects([]);
  };

  const onMobKill = (index: number) => {
    setKillCount(prev => prev + 1);
  };

  const onLootBoxClose = (index: number) => {
    setObjects(prev => prev.filter(item => item.key !== index));
  };

  useEffect(() => {
    if (killCount === killCountMax) {
      nextLocationId &&
        dispatch({
          type: 'addUnlockedLocation',
          locationId: nextLocationId
        });
      nextRoom &&
        dispatch({
          type: 'unlockRoom',
          roomName: nextRoom
        });
    }
  }, [dispatch, killCount, killCountMax, nextLocationId, nextRoom]);

  return (
    <HitContextProvider>
      <ScrollArea>
        {killCount === killCountMax && (
          <Rythm>
            <UIBlockInner>
              молодец, всех победил!
              {nextLocationId &&
              firstTimeUnlockLocation.current &&
              player.unlockedLocations.includes(nextLocationId) ? (
                <div>
                  Новая локация доступна{' '}
                  <Button
                    to={`/${params.gameName}/locations/${nextLocationId}`}
                    onClick={clear}
                  >
                    {locations[nextLocationId].name}
                  </Button>
                </div>
              ) : (
                <>
                  {nextRoom &&
                    firstTimeUnlockRoom.current &&
                    player.unlockedRoomNames.includes(nextRoom) && (
                      <div>
                        Новая зона доступна{' '}
                        <Button
                          onClick={clear}
                          to={`/${params.gameName}/locations/${params.locationId}/${room[nextRoom].name}`}
                        >
                          {room[nextRoom].label}
                        </Button>
                      </div>
                    )}
                </>
              )}
            </UIBlockInner>
          </Rythm>
        )}
        {objects.map(i => {
          return (
            <Rythm key={i.key}>
              <ClickableObject
                clob={i.clob}
                onKill={onMobKill}
                onLootBoxClose={onLootBoxClose}
                index={i.key}
              />
            </Rythm>
          );
        })}
      </ScrollArea>
      <HitArea />
    </HitContextProvider>
  );
};

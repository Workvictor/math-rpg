import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { useRouteMatch } from 'react-router';

import { Rythm, UIBlockInner } from '../layout';
import { ClickableObject } from '../ClickableObject';
import { HitArea } from '../HitArea';
import { HitContextProvider } from '../HitArea/Context';
import { usePlayerContext, usePlayerDispatcher } from '../Player/PlayerContext';
import { Clob } from '../world/Clob';
import { spreadRange } from '../utils/spreadRange';
import { RoomModel } from '../world/RoomModel';
import { room } from '../world/rooms';
import { locations } from '../world/world';
import { Button } from '../Button';
import { IRoomRoute } from './IRoomRoute';
import { fillByChance } from '../utils/fillByChance';
import { clobs } from '../world/clobs';
import { randomValueFromRange } from '../utils/randomValueFromRange';
import { SmoothScroll } from '../SmoothScroll';
import { sortBy } from '../utils/sortBy';
import { ClickableObjectRoot } from '../ClickableObject/ClickableObjectRoot';

export const Room: FC<{ room: RoomModel }> = props => {
  const {
    clobsCount,
    level,
    nextLocationId,
    nextRoom,
    objects: rObjs
  } = props.room;

  const firstTimeUnlockLocation = useRef<boolean>();
  const firstTimeUnlockRoom = useRef<boolean>();

  const { params } = useRouteMatch<IRoomRoute>();

  const { state: player } = usePlayerContext();
  const dispatch = usePlayerDispatcher();

  const [killCount, setKillCount] = useState(0);
  const [killCountMax, setKillCountMax] = useState(1);
  const [objects, setObjects] = useState<{ key: number; clob: Clob }[]>([]);

  useEffect(() => {
    return () => {
      dispatch({
        type: 'setTarget',
        targetId: null
      });
    };
  }, [dispatch]);

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
    const sortedByChance = sortBy(rObjs, 'chance', -1);

    const clobTypeTable = fillByChance(
      sortedByChance.map(i => i.clobType),
      sortedByChance.map(i => i.chance),
      spreadRange(clobsCount)
    ).map((type, key) => {
      const clob = clobs[type]?.setLevel(
        randomValueFromRange([Math.max(1, level - 1), level + 1])
      );
      return {
        key,
        clob
      };
    });

    setKillCount(0);
    setKillCountMax(clobTypeTable.length);
    setObjects(clobTypeTable);
  }, [clobsCount, level, rObjs]);

  const clear = () => {
    //TODO add notify before reload
    setKillCount(0);
    setKillCountMax(1);
    setObjects([]);
  };

  const onMobKill = useCallback((index: number) => {
    setKillCount(prev => prev + 1);
  }, []);

  const onLootBoxClose = useCallback((index: number) => {
    setObjects(prev => prev.filter(item => item.key !== index));
  }, []);

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
      <SmoothScroll>
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
                        Новая зона [{room[nextRoom].label}] доступна{' '}
                        <Button
                          onClick={clear}
                          to={`/${params.gameName}/locations/${params.locationId}}`}
                        >
                          выход
                        </Button>
                      </div>
                    )}
                </>
              )}
            </UIBlockInner>
          </Rythm>
        )}
        {objects.map(i => {
          return i.clob ? (
            <Rythm key={i.key}>
              <ClickableObjectRoot
                index={i.key}
                clob={i.clob}
                onKill={onMobKill}
                onLootBoxClose={onLootBoxClose}
                playerTargetId={player.targetId}
                playerCanAttack={
                  (player.targetId === i.key || player.targetId === null) &&
                  player.nextAttackTime <= Date.now() &&
                  player.stamina >= 5
                }
                playerAttackDelay={player.attackDelay}
                playerDamage={player.damage}
              />
            </Rythm>
          ) : null;
        })}
      </SmoothScroll>
      <HitArea />
    </HitContextProvider>
  );
};

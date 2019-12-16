import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { useRouteMatch } from 'react-router';

import { Rythm, UIBlockInner } from '../layout';
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
import { ClickableObject } from '../ClickableObject';

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

  const [bossIsKilled, setBossIsKilled] = useState(false);

  const [killCount, setKillCount] = useState(0);
  const [killCountMax, setKillCountMax] = useState(1);
  const [objects, setObjects] = useState<
    { key: number; clob: Clob; isBoss?: boolean }[]
  >([]);

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

    const boss = clobs[props.room.bossType].setLevel(level + 2).setModifiers({
      expValue: 1.5,
      damageValue: 1.5,
      attackTimeoutValue: 1.5,
      healthPointValue: 3,
      goldAmountValue: 4
    });

    setKillCount(0);
    setKillCountMax(clobTypeTable.length + 1);
    setObjects([
      ...clobTypeTable,
      { key: clobTypeTable.length, clob: boss, isBoss: true }
    ]);
  }, [clobsCount, level, props.room.bossType, rObjs]);

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
          return (
            <Rythm key={i.key}>
              <ClickableObject
                index={i.key}
                isBoss={i.isBoss}
                clob={i.clob}
                onKill={onMobKill}
                onLootBoxClose={onLootBoxClose}
                playerTargetId={player.targetId}
                playerCanAttack={
                  (player.targetId === i.key || player.targetId === null) &&
                  player.nextAttackTime <= Date.now() &&
                  player.stamina >= 5
                }
                playerNextAttackTime={player.nextAttackTime}
                playerAttackDelay={player.attackDelay}
                playerDamage={player.damage}
              />
            </Rythm>
          );
        })}
      </SmoothScroll>
      <HitArea />
    </HitContextProvider>
  );
};

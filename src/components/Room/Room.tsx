import React, { FC, useCallback, useEffect, useState } from 'react';

import { Rythm } from '../layout';
import { usePlayerDispatcher } from '../Player/PlayerContext';
import { Clob } from '../world/Clob';
import { RoomModel } from '../world/RoomModel';
import { fillByChance } from '../utils/fillByChance';
import { clobs } from '../world/clobs';
import { randomValueFromRange } from '../utils/randomValueFromRange';
import { SmoothScroll } from '../SmoothScroll';
import { sortBy } from '../utils/sortBy';
import { ClickableObject } from '../ClickableObject';
import { usePlayerSelector } from '../Player/usePlayerSelector';
import { getSumBy } from '../utils/getSumBy';
import { RoomControls } from './RoomControls';
import { DropArea } from '../DropArea/DropArea';
import { useTimeout } from '../utils/useTimeout';

export const Room: FC<{ room: RoomModel }> = props => {
  const {
    clobsCount,
    level,
    nextLocationId,
    nextRoom,
    objects: rObjs
  } = props.room;

  const player = usePlayerSelector();
  const dispatch = usePlayerDispatcher();

  const [targetId, setTargetId] = useState<number>(0);
  const [targetIsMounted, setTargetIsMounted] = useState(false);

  const [goldLoot, setGoldLoot] = useState<{ index: number; amount: number }[]>(
    []
  );

  const [killCount, setKillCount] = useState(0);
  const [killCountMax, setKillCountMax] = useState(1);
  const [objects, setObjects] = useState<
    { key: number; clob: Clob; isBoss?: boolean }[]
  >([]);

  const init = useCallback(() => {
    const sortedByChance = sortBy(rObjs, 'chance', -1);

    const clobTypeTable = fillByChance(
      sortedByChance.map(i => i.clobType),
      sortedByChance.map(i => i.chance),
      clobsCount
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

    setTargetId(0);
    setKillCount(0);
    setKillCountMax(clobTypeTable.length + 1);
    setObjects([
      ...clobTypeTable,
      { key: clobTypeTable.length, clob: boss, isBoss: true }
    ]);
  }, [clobsCount, level, props.room.bossType, rObjs]);

  useEffect(() => {
    init();
  }, [init]);

  const onMobKill = useCallback((index: number, amount: number) => {
    setObjects(prev => prev.filter(item => item.key !== index));
    setGoldLoot(p => [...p, { index, amount }]);
    setKillCount(prev => prev + 1);
    setTargetId(index + 1);
  }, []);

  const onGoldUnmount = useCallback((index: number) => {
    setGoldLoot(p => p.filter(i => i.index !== index));
  }, []);

  const [nextAttackTime, setNextAttackTime] = useState(Date.now());
  const [playerCanAttack, setPlayerCanAttack] = useState(false);

  const [damage, setDamage] = useState<{ index: number; value: number }[]>([]);

  const playerDispatch = usePlayerDispatcher();

  const playerDidAttack = useCallback(() => {
    if (playerCanAttack) {
      playerDispatch({
        type: 'DidAttack'
      });
      setNextAttackTime(Date.now() + player.attackDelay);
      setDamage(prev => [...prev, { index: targetId, value: player.damage }]);
    }
  }, [
    playerCanAttack,
    playerDispatch,
    player.attackDelay,
    player.damage,
    targetId
  ]);

  useEffect(() => {
    if (player.stamina >= 5 && nextAttackTime <= Date.now()) {
      console.log('useEffect setPlayerCanAttack')
      setPlayerCanAttack(true);
    }
  }, [nextAttackTime, player.stamina]);

  useTimeout(
    () => {
      console.log('useTimeout')
      playerDidAttack();
    },
    targetIsMounted && player.stamina >= 5 && nextAttackTime <= Date.now(),
    Math.max(0, nextAttackTime - Date.now())
  );

  const onTargetMount = useCallback(() => {
    setTargetIsMounted(true);
  }, []);

  useEffect(() => {
    if (killCount === killCountMax) {
      nextLocationId &&
        dispatch({
          type: 'AddUnlockedLocationId',
          locationId: nextLocationId
        });
      nextRoom &&
        dispatch({
          type: 'AddUnlockedRoomId',
          roomId: nextRoom
        });
    }
  }, [dispatch, killCount, killCountMax, nextLocationId, nextRoom]);

  return (
    <SmoothScroll>
      <RoomControls
        onRepeat={init}
        killCountMax={killCountMax}
        killCount={killCount}
      />
      {objects
        .filter(i => i.key === targetId)
        .map(i => {
          const damageDealt = getSumBy(
            damage.filter(d => d.index === i.key),
            'value'
          );
          return (
            <Rythm key={i.key}>
              <ClickableObject
                index={i.key}
                damageDealt={damageDealt}
                isBoss={i.isBoss}
                clob={i.clob}
                onKill={onMobKill}
                onTargetMount={onTargetMount}
              />
            </Rythm>
          );
        })}
      <DropArea goldLoot={goldLoot} onGoldUnmount={onGoldUnmount} />
    </SmoothScroll>
  );
};

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
import { useRaf } from '../utils/RAF';
import { Divider } from '../layout/Divider';
import layout from '../layout/layout.module.scss';

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

  const [damage, setDamage] = useState<
    { index: number; value: number; isCritical?: boolean }[]
  >([]);

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
      damageValue: 1,
      attackTimeoutValue: 1,
      healthPointValue: 3,
      goldAmountValue: 4
    });

    setTargetId(0);
    setGoldLoot([]);
    setDamage([]);
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

  const playerDispatch = usePlayerDispatcher();

  const playerDidAttack = useCallback(() => {
    playerDispatch({
      type: 'DidAttack'
    });
    const isCritical = Math.random() * 100 <= player.critChance;
    const value = isCritical ? player.damage * 1.5 : player.damage;
    setDamage(prev => [...prev, { index: targetId, value, isCritical }]);
  }, [playerDispatch, player.critChance, player.damage, targetId]);

  const onTargetMount = useCallback(() => {
    setTargetIsMounted(true);
  }, []);

  useRaf(() => {
    if (
      targetIsMounted &&
      killCount !== killCountMax &&
      player.stamina >= 5 &&
      player.nextAttackTime <= Date.now()
    ) {
      playerDidAttack();
    }
  });

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
      <div className={layout.flexColumnBetween}>
        <div>
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
                    onMount={onTargetMount}
                    index={i.key}
                    damageDealt={damageDealt}
                    isBoss={i.isBoss}
                    clob={i.clob}
                    onKill={onMobKill}
                  />
                </Rythm>
              );
            })}
          <Divider />
        </div>
        <DropArea goldLoot={goldLoot} onGoldUnmount={onGoldUnmount} />
      </div>
    </SmoothScroll>
  );
};

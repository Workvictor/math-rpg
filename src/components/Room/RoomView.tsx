import React, { FC, useCallback, useEffect, useState } from 'react';

import { Rythm } from '../layout';
import { usePlayerDispatcher } from '../Player/PlayerContext';
import { SmoothScroll } from '../SmoothScroll';
import { ClickableObject } from '../ClickableObject';
import { usePlayerSelector } from '../Player/usePlayerSelector';
import { Controls } from './Controls';
import { DropArea } from '../DropArea/DropArea';
import { useRaf } from '../utils/RAF';
import { Divider } from '../layout/Divider';
import layout from '../layout/layout.module.scss';
import { IRoom } from './createRoom';
import { monsterPrefabs } from '../Entity/monsterPrefabs';
import { randomElementFrom } from '../utils/randomElementFrom';
import { Entity } from '../Entity/Entity';
import { useTimeout } from '../utils/useTimeout';

export const RoomView: FC<IRoom> = props => {
  const { level, index, bossMods, mobCount, mobTypes } = props;

  const player = usePlayerSelector();
  const dispatch = usePlayerDispatcher();

  const [targetId, setTargetId] = useState<number>(0);

  const [targetIsMounted, setTargetIsMounted] = useState(false);

  const [goldLoot, setGoldLoot] = useState<{ index: number; amount: number }[]>(
    []
  );

  const [killCount, setKillCount] = useState(0);
  const [killCountMax, setKillCountMax] = useState(1);
  const [objects, setObjects] = useState<Entity[]>([]);

  const init = useCallback(() => {
    const mobs: Entity[] = [];

    for (let i = 0; i < mobCount; i++) {
      const instance = monsterPrefabs[randomElementFrom(mobTypes)]();
      instance.level = level;
      mobs.push(instance);
    }

    const boss = monsterPrefabs[randomElementFrom(mobTypes)]();
    boss.level += 2;
    boss.mod = new Entity.Mod(bossMods.mod);

    mobs.push(boss);

    setGoldLoot([]);
    setKillCount(0);
    setKillCountMax(mobs.length);
    setObjects(mobs);
  }, [bossMods, level, mobCount, mobTypes]);

  useEffect(() => {
    init();
  }, [init]);

  const onMobKill = useCallback((index: number, amount: number) => {
    setObjects(prev => prev.filter(item => item.instanceId !== index));
    setGoldLoot(p => [...p, { index, amount }]);
    setKillCount(prev => prev + 1);
    setTargetIsMounted(false);
  }, []);

  useEffect(() => {
    if (objects.length > 0 && targetId !== objects[0].instanceId) {
      setTargetId(objects[0].instanceId);
    }
  }, [objects, targetId]);

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
    setObjects(prev =>
      prev.map(mob => {
        if (mob.instanceId === targetId) {
          mob.takeDamage(value);
        }
        if (mob.isDead) {
          onMobKill(mob.instanceId, mob.goldAmount);
          playerDispatch({
            type: 'AddExp',
            expReward: mob.experience,
            targetLevel: mob.level
          });
        }
        return mob;
      })
    );
  }, [playerDispatch, player.critChance, player.damage, targetId, onMobKill]);

  useRaf(() => {
    if (
      killCount !== killCountMax &&
      player.stamina >= 5 &&
      player.nextAttackTime <= Date.now()
    ) {
      playerDidAttack();
    }
  });

  useEffect(() => {
    if (killCount === killCountMax) {
      dispatch({
        type: 'AddUnlockedRoomId',
        roomId: index + 1
      });
    }
  }, [dispatch, index, killCount, killCountMax]);

  const currentMob = objects.find(i => i.instanceId === targetId);

  return (
    <SmoothScroll>
      <div className={layout.flexColumnBetween}>
        <div>
          <Controls
            onRepeat={init}
            killCountMax={killCountMax}
            killCount={killCount}
          />
          {currentMob && (
            <Rythm>
              <ClickableObject
                damageTakenAll={currentMob.damageTakenAll}
                damage={currentMob.damage}
                healthPoints={currentMob.healthPoints}
                attackDelay={currentMob.attackDelay}
                isDead={currentMob.isDead}
                icon={currentMob.icon}
                level={currentMob.level}
                name={currentMob.name}
                isBoss={currentMob.isBoss}
                hpMax={currentMob.hpMax}
              />
            </Rythm>
          )}
          <Divider />
        </div>
        <DropArea goldLoot={goldLoot} onGoldUnmount={onGoldUnmount} />
      </div>
    </SmoothScroll>
  );
};

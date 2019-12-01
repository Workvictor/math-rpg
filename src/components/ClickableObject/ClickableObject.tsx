import React, { FC, useEffect, useState } from 'react';

import { Border, FlexBetween, FlexWide, UIBlockInner } from '../layout';
import styled, { keyframes } from 'styled-components';
import { clickableObjectTypes } from './clickableObjectTypes';
import { Icon } from '../Icon';
import { usePlayerContext } from '../Player/PlayerContext';
import { useRaf } from '../RAF';
import { useHitContext } from '../HitArea/Context';
import { Button } from '../Button';

const onDeath = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

const shake = keyframes`
  0% {
    transform: translateX(-3px);
  }
  20% {
    transform: translateX(3px);
  }
  40% {
    transform: translateX(-2px);
  }
  60% {
    transform: translateX(2px);
  }
  80% {
    transform: translateX(-1px);
  }
  100% {
    transform: translateX(0px);
  }
`;

const Wrapper = styled(UIBlockInner)`
  padding: 2px;
  &.animated {
    animation: 300ms ${shake};
  }
  &.onDeath {
    animation: 1000ms ${onDeath};
  }
`;

const Stats = styled(FlexBetween)`
  padding: 2px;
`;

const StatsWrapper = styled.div`
  padding: 0 4px;
  width: 100%;
`;

const Avatar = styled(Border)`
  font-size: 48px;
  display: flex;
  color: ${props => props.theme.colors.grey60};
  flex-shrink: 0;
  &.aggressive {
    color: ${props => props.theme.colors.darkred200};
  }
`;

export const ClickableObject: FC<{
  index: number;
  levelRange: number[];
  onDeath: (id: number) => void;
}> = props => {
  const { state: playerState, dispatch: playerDispatch } = usePlayerContext();

  const { levelRange, index, onDeath } = props;
  const attackDelay = 1000;

  const [isAnimated, setAnimated] = useState(false);

  const [attackTime, setAttackTime] = useState(Date.now());
  const [aggressive, setAggressive] = useState(false);
  const [level] = useState(
    Math.floor(levelRange[0] + Math.random() * levelRange[1])
  );
  // const intelegence = Math.round(level * 1.15 + 1); // as third stat
  // const agility = Math.round(level * 1.25 + 1); // as secondary stat
  // const strenght = Math.round(level * 1.6 + 1); // as main stat

  // const mobHp = level * 1.18 + strenght * 4;
  // const armorValue = (mobStrenght*1.6 + mobAgility*1.3)/2;
  // const armorCur = (mobStrenght + mobAgility)/2;
  // const armor = (armorCur/ armorValue);
  // const mobExpReward = mobHp * 0.6;

  const availableMobTypes = clickableObjectTypes.filter(item =>
    item.level.includes(level)
  );
  const [mob] = useState(
    availableMobTypes[Math.floor(Math.random() * availableMobTypes.length)]
  );

  const [hpMax] = useState(
    Math.floor((20 + (level - 1) * 4) * mob.healthPointValue)
  );
  const [healthPoints, setHealthPoints] = useState(hpMax);
  const [expRewardForKill] = useState(
    Math.floor(healthPoints * 0.4 * (mob.expValue || 1))
  );
  const damage = Math.floor((4 + (level - 1) * 1.2) * mob.damageValue);

  const { dispatch: hitDispatch } = useHitContext();

  const onMobClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const { pageX, pageY } = e;
    hitDispatch({
      type: 'addHit',
      pageX,
      pageY,
      value: playerState.damage
    });

    if (!isAnimated) {
      setAnimated(true);
    }

    if (!aggressive) {
      setAggressive(true);
    }
    setHealthPoints(prev => prev - playerState.damage);
    if (playerState.targetId !== index) {
      playerDispatch({
        type: 'setTarget',
        targetId: index
      });
    }
    if (mob.damageReturnValue > 0) {
      playerDispatch({
        type: 'takeDamage',
        damage: mob.damageReturnValue
      });
    }
  };

  useEffect(() => {
    if (healthPoints <= 0) {
      playerDispatch({
        type: 'setTarget',
        targetId: null
      });
      playerDispatch({
        type: 'addExp',
        expReward: Math.floor((level / playerState.level) * expRewardForKill)
      });
    }
  }, [
    expRewardForKill,
    healthPoints,
    index,
    level,
    onDeath,
    playerDispatch,
    playerState.level
  ]);

  const attackLoop = React.useCallback(() => {
    if (
      aggressive &&
      damage > 0 &&
      healthPoints > 0 &&
      attackTime <= Date.now()
    ) {
      setAttackTime(Date.now() + attackDelay);
      playerDispatch({
        type: 'takeDamage',
        damage
      });
    }
    return playerState.healthPoints > 0 && healthPoints > 0;
  }, [
    aggressive,
    attackTime,
    damage,
    healthPoints,
    playerDispatch,
    playerState.healthPoints
  ]);

  useRaf(attackLoop);

  const onAnimationEnd = () => {
    setAnimated(false);
  };

  const onCollectReward = () => {
    onDeath(index);
  };

  return (
    <>
      <Wrapper
        onAnimationEnd={onAnimationEnd}
        className={isAnimated ? 'animated' : ''}
        onClick={healthPoints > 0 ? onMobClick : undefined}
      >
        <FlexWide>
          <Avatar
            className={healthPoints > 0 && aggressive ? 'aggressive' : ''}
          >
            <Icon type={healthPoints > 0 ? mob.icon : 'lootBag'} />
          </Avatar>
          {healthPoints > 0 ? (
            <StatsWrapper>
              <Stats>
                <div>{mob.name}</div>
                <div>Уровень: {level}</div>
              </Stats>
              <Stats>
                <div>Урон: {damage}</div>
                <div>
                  Здоровье: {healthPoints}/{hpMax}
                </div>
              </Stats>
            </StatsWrapper>
          ) : (
            <>
              <StatsWrapper>
                <Stats>
                  <div>{['пусто'].join(', ')}</div>
                  <Button onClick={onCollectReward}>собрать</Button>
                </Stats>
              </StatsWrapper>
            </>
          )}
        </FlexWide>
      </Wrapper>
    </>
  );
};

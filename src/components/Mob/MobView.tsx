import React, { FC, useEffect, useState } from 'react';

import { Border, FlexBetween, FlexWide, UIBlockInner } from '../layout';
import styled from 'styled-components';
import { mobTypes } from './mobTypes';
import { Icon } from '../Icon';
import { IconButton } from '../Button';
import { usePlayerContext } from '../Player/PlayerContext';

const Stats = styled(FlexBetween)`
  padding: 2px;
`;

const StatsWrapper = styled.div`
  padding: 0 4px;
  width: 100%;
`;

const Avatar = styled(Border)`
  font-size: 32px;
  display: flex;
  color: ${props => props.theme.colors.grey60};
  flex-shrink: 0;
  &.aggressive {
    color: ${props => props.theme.colors.darkred200};
  }
`;

interface IMobView {
  index: number;
  levelRange: number[];
  onDeath: (id: number) => void;
}

export const MobView: FC<IMobView> = props => {
  const { state: playerState, dispatch: playerDispatch } = usePlayerContext();

  const { levelRange, index, onDeath } = props;
  const attackDelay = 1000;
  // const [attackTime, setAttackTime] = useState(Date.now());
  const [aggressive, setAggressive] = useState(false);
  const [level] = useState(
    Math.floor(levelRange[0] + Math.random() * levelRange[1])
  );
  const availableMobTypes = mobTypes.filter(item => item.level.includes(level));
  const mob =
    availableMobTypes[Math.floor(Math.random() * availableMobTypes.length)];

  const [healthPoints, setHealthPoints] = useState(
    Math.floor((20 + (level - 1) * 4) * mob.healthPointValue)
  );
  const [expRewardForKill] = useState(Math.floor(healthPoints * 0.4));
  const damage = Math.floor((4 + (level - 1) * 1.2) * mob.damageValue);
  const onMobClick = () => {
    if (!aggressive) {
      setAggressive(true);
    }
    if (playerState.targetId !== index) {
      playerDispatch({
        type: 'setTarget',
        targetId: index
      });
    }
  };
  useEffect(() => {
    if (playerState.targetId === index && healthPoints > 0) {
      const tid = setTimeout(() => {
        setHealthPoints(prev => prev - playerState.damage);
      }, playerState.attackDelay);
      return () => {
        clearTimeout(tid);
      };
    }
  }, [
    healthPoints,
    index,
    playerState.attackDelay,
    playerState.damage,
    playerState.targetId
  ]);
  useEffect(() => {
    if (healthPoints <= 0) {
      playerDispatch({
        type: 'setTarget',
        targetId: null
      });
      playerDispatch({
        type: 'addExp',
        expReward: expRewardForKill
      });
      onDeath(index);
    }
  }, [expRewardForKill, healthPoints, index, onDeath, playerDispatch]);
  useEffect(() => {
    if (aggressive) {
      const tid = setTimeout(() => {
        playerDispatch({
          type: 'takeDamage',
          damage
        });
      }, attackDelay);
      return () => {
        clearTimeout(tid);
      };
    }
  }, [aggressive, damage, playerDispatch]);
  return (
    <UIBlockInner>
      <FlexWide>
        <Avatar className={aggressive ? 'aggressive' : ''}>
          <Icon type={mob.icon} />
        </Avatar>
        <StatsWrapper>
          <Stats>
            <div>{mob.name}</div>
            <div>Уровень: {level}</div>
          </Stats>
          <Stats>
            <div>Урон: {damage}</div>
            <div>Здоровье: {healthPoints}</div>
          </Stats>
        </StatsWrapper>
        {playerState.targetId !== index && (
          <IconButton type={'crossSwords'} onClick={onMobClick} />
        )}
      </FlexWide>
    </UIBlockInner>
  );
};

import React, { FC, useEffect, useState } from 'react';

import { Border, FlexBetween, FlexWide, UIBlockInner } from '../layout';
import styled from 'styled-components';
import { clickableObjectTypes } from './clickableObjectTypes';
import { Icon } from '../Icon';
import { usePlayerContext } from '../Player/PlayerContext';
import { useRaf } from '../RAF';

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

interface IClickableObject {
  index: number;
  levelRange: number[];
  onDeath: (id: number) => void;
}

export const ClickableObject: FC<IClickableObject> = props => {
  const { state: playerState, dispatch: playerDispatch } = usePlayerContext();

  const { levelRange, index, onDeath } = props;
  const attackDelay = 1000;
  const [attackTime, setAttackTime] = useState(Date.now());
  const [aggressive, setAggressive] = useState(false);
  const [level] = useState(
    Math.floor(levelRange[0] + Math.random() * levelRange[1])
  );
  const availableMobTypes = clickableObjectTypes.filter(item =>
    item.level.includes(level)
  );
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
        expReward: expRewardForKill
      });
      onDeath(index);
    }
  }, [expRewardForKill, healthPoints, index, onDeath, playerDispatch]);

  const attackLoop = React.useCallback(() => {
    if (aggressive && damage > 0 && attackTime <= Date.now()) {
      setAttackTime(Date.now() + attackDelay);
      playerDispatch({
        type: 'takeDamage',
        damage
      });
    }
    return playerState.healthPoints > 0;
  }, [
    aggressive,
    attackTime,
    damage,
    playerDispatch,
    playerState.healthPoints
  ]);

  useRaf(attackLoop);

  return (
    <UIBlockInner onClick={onMobClick}>
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
      </FlexWide>
    </UIBlockInner>
  );
};

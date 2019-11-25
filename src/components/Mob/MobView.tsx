import React, { FC, useEffect, useState } from 'react';

import { Border, FlexBetween, FlexWide, UIBlockInner } from '../layout';
import styled from 'styled-components';
import { mobTypes } from './mobTypes';
import { SvgIcon } from '../icons';
import { IconButton } from '../Button';
import { useGameProvider } from '../Game';
import { useGameContext, useGameDispatcher } from '../Game/GameContext';

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
  const state = useGameContext();
  const { dispatch: gameDispatch } = useGameDispatcher();
  const { updateGame } = useGameProvider();
  const { levelRange, index, onDeath } = props;
  const attackDelay = 1000;
  const [attackTime, setAttackTime] = useState(Date.now());
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
    if (state.game[state.selectedGame].targetId !== index) {
      gameDispatch({
        type: 'setTarget',
        payload: {
          targetId: index
        }
      });
    }
  };
  useEffect(() => {
    if (state.game[state.selectedGame].targetId === index && healthPoints > 0) {
      const tid = setTimeout(() => {
        setHealthPoints(prev => prev - state.game[state.selectedGame].damage);
      }, state.game[state.selectedGame].attackDelay);
      return () => {
        clearTimeout(tid);
      };
    }
  }, [healthPoints, index, state.game, state.selectedGame]);
  useEffect(() => {
    if (healthPoints <= 0) {
      onDeath(index);
      gameDispatch({
        type: 'setTarget',
        payload: {
          targetId: null
        }
      });
      gameDispatch({
        type: 'addExp',
        payload: {
          expReward: expRewardForKill
        }
      });
    }
  }, [gameDispatch, expRewardForKill, healthPoints, index, onDeath]);
  useEffect(() => {
    if (aggressive && state.game[state.selectedGame].healthPoints > 0) {
      const tid = setTimeout(() => {
        gameDispatch({
          type: 'takeDamage',
          payload: {
            damage
          }
        });
      }, attackDelay);
      return () => {
        clearTimeout(tid);
      };
    }
  }, [aggressive, damage, state.selectedGame, updateGame]);
  return (
    <UIBlockInner>
      <FlexWide>
        <Avatar className={aggressive ? 'aggressive' : ''}>
          <SvgIcon type={mob.icon} />
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
        {state.game[state.selectedGame].targetId !== index && (
          <IconButton type={'crossSwords'} onClick={onMobClick} />
        )}
      </FlexWide>
    </UIBlockInner>
  );
};

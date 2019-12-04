import React, { FC, useState } from 'react';

import { Border, FlexBetween, FlexWide, UIBlockInner } from '../layout';
import styled, { keyframes } from 'styled-components';
import { clickableObjectTypes } from './clickableObjectTypes';
import { Icon } from '../Icon';
import { usePlayerContext } from '../Player/PlayerContext';
import { useHitContext } from '../HitArea/Context';
import { Button } from '../Button';
import { useTimeout } from '../utils/useTimeout';

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

  const [aggressive, setAggressive] = useState(false);
  const [level] = useState(
    Math.floor(levelRange[0] + Math.random() * levelRange[1])
  );

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
    if (healthPoints - playerState.damage <= 0) {
      const getExpReward = () => {
        if (level > playerState.level - 2 && level <= playerState.level + 6) {
          return expRewardForKill;
        }
        if (level <= playerState.level - 2) {
          return Math.floor(expRewardForKill * 0.75);
        }
        if (level <= playerState.level - 3 && level >= playerState.level - 4) {
          return Math.floor(expRewardForKill * 0.5);
        }
        return Math.floor(expRewardForKill * 0.2);
      };
      setHealthPoints(0);
      setAggressive(false);
      playerDispatch({
        type: 'setTarget',
        targetId: null
      });
      playerDispatch({
        type: 'addExp',
        expReward: getExpReward()
      });
    } else {
      hitDispatch({
        type: 'addHit',
        pageX,
        pageY,
        value: playerState.damage
      });

      if (!isAnimated) {
        setAnimated(true);
      }

      if (!aggressive && damage > 0) {
        setAggressive(true);
      }
      if (playerState.targetId !== index) {
        playerDispatch({
          type: 'setTarget',
          targetId: index
        });
      }
      playerDispatch({
        type: 'loseStamina',
        amount: 5
      });

      setHealthPoints(prev => prev - playerState.damage);
    }
  };

  useTimeout(
    () => {
      playerDispatch({
        type: 'takeDamage',
        damage
      });
    },
    damage > 0 && aggressive && healthPoints > 0,
    attackDelay
  );

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

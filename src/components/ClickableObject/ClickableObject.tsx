import React, { FC, useState } from 'react';

import { Border, Flex, FlexBetween, FlexWide, UIBlockInner } from '../layout';
import styled, { keyframes } from 'styled-components';
import { clickableObjectTypes } from './clickableObjectTypes';
import { Icon } from '../Icon';
import { usePlayerContext } from '../Player/PlayerContext';
import { useHitContext } from '../HitArea/Context';
import { Button } from '../Button';
import { useTimeout } from '../utils/useTimeout';
import { Clob } from '../world/Clob';
import { IItem } from '../world/items';
import { randomValueFromRange } from '../utils/randomValueFromRange';
import { spreadRange } from '../utils/spreadRange';

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
  clob: Clob;
  index: number;
  onDeath: () => void;
}> = props => {
  const { state: playerState, dispatch: playerDispatch } = usePlayerContext();
  const { dispatch: hitDispatch } = useHitContext();

  const { clob, index, onDeath } = props;
  const { level, label, attackTimeout, damage, icon } = clob;

  const [goldAmount, setGoldAmount] = useState<number>();

  const [loot, setLoot] = useState<{ item: IItem; key: number }[]>([]);

  const [isAnimated, setAnimated] = useState(false);

  const [aggressive, setAggressive] = useState(false);

  const [hpMax] = useState(clob.healthPoints);

  const [healthPoints, setHealthPoints] = useState(clob.healthPoints);

  const onMobClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const { pageX, pageY } = e;
    if (healthPoints - playerState.damage <= 0) {
      setHealthPoints(0);
      setLoot(
        clob.loot
          .filter(
            (_, index) =>
              randomValueFromRange([0, 100]) < clob.lootChance[index] * 100
          )
          .map((item, key) => ({ item, key }))
      );
      setGoldAmount(spreadRange(clob.goldAmount));
      setAggressive(false);
      playerDispatch({
        type: 'setTarget',
        targetId: null
      });
      playerDispatch({
        type: 'addExp',
        expReward: clob.getExpRewardByLevel(playerState.level)
      });
      return;
    }

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
  };

  useTimeout(
    () => {
      playerDispatch({
        type: 'takeDamage',
        damage
      });
    },
    damage > 0 && aggressive && healthPoints > 0,
    attackTimeout
  );

  const onAnimationEnd = () => {
    setAnimated(false);
  };

  const onCloseLootBox = () => {
    onDeath();
  };

  const onPickGold = () => {
    setGoldAmount(0);
  };

  const onPickItem = (key: number) => () => {
    setLoot(prev => prev.filter(i => i.key !== key));
  };

  return (
    <>
      <Wrapper
        onAnimationEnd={onAnimationEnd}
        className={isAnimated ? 'animated' : ''}
        onClick={
          healthPoints > 0 && playerState.stamina >= 5 ? onMobClick : undefined
        }
      >
        <FlexWide>
          <Avatar
            className={healthPoints > 0 && aggressive ? 'aggressive' : ''}
          >
            <Icon type={healthPoints > 0 ? icon : 'lootBag'} />
          </Avatar>
          {healthPoints > 0 ? (
            <StatsWrapper>
              <Stats>
                <div>{label}</div>
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
                  <div>
                    {Boolean(goldAmount) && (
                      <div onClick={onPickGold}>{goldAmount} золото</div>
                    )}
                    {loot.map((i, key) => (
                      <div onClick={onPickItem(key)} key={key}>
                        {i.item.label}
                      </div>
                    ))}
                  </div>
                  <Button onClick={onCloseLootBox}>закрыть</Button>
                </Stats>
              </StatsWrapper>
            </>
          )}
        </FlexWide>
      </Wrapper>
    </>
  );
};

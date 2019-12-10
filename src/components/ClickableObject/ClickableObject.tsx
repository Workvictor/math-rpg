import React, { FC, useState } from 'react';

import {
  Border,
  FlexBetween,
  FlexStart,
  FlexWide,
  Rythm,
  UIBlockInner
} from '../layout';
import styled, { keyframes } from 'styled-components';
import { usePlayerContext } from '../Player/PlayerContext';
import { useHitContext } from '../HitArea/Context';
import { Button } from '../Button';
import { useTimeout } from '../utils/useTimeout';
import { Clob } from '../world/Clob';
import { IItem } from '../world/items';
import { randomValueFromRange } from '../utils/randomValueFromRange';
import { spreadRange } from '../utils/spreadRange';
import { LootBag } from '../Icon/LootBag';
import { Click } from '../Icon/Click';
import { useGameContext } from '../Game/GameContext';

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
  height: 54px;
  width: 54px;
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
  onLootBoxClose: (index: number) => void;
  onKill: (index: number) => void;
}> = props => {
  const {
    state: playerState,
    dispatch: playerDispatch,
    actions: playerActions
  } = usePlayerContext();

  const { dispatch: gameDispatch } = useGameContext();

  const { dispatch: hitDispatch } = useHitContext();

  const { clob, index, onLootBoxClose, onKill } = props;
  const { level, label, attackTimeout, damage, icon } = clob;

  const [goldAmount, setGoldAmount] = useState(0);

  const [loot, setLoot] = useState<{ item: IItem; key: number }[]>([]);

  const [isAnimated, setAnimated] = useState(false);

  const [aggressive, setAggressive] = useState(false);

  const [hpMax] = useState(clob.healthPoints);

  const [healthPoints, setHealthPoints] = useState(clob.healthPoints);

  const onMobClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const { pageX, pageY } = e;

    gameDispatch({
      type: 'addClickCount'
    });

    playerDispatch(playerActions.didAttack(index, 5));

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

    if (healthPoints - playerState.damage <= 0) {
      setHealthPoints(0);
      onKill(index);
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

    setHealthPoints(prev => Math.max(0, prev - playerState.damage));
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
    onLootBoxClose(index);
  };

  const onPickGold = () => {
    playerDispatch({
      type: 'pickGold',
      amount: goldAmount
    });
    gameDispatch({
      type: 'addClickCount'
    });
    setGoldAmount(0);
  };

  const onPickItem = (key: number) => () => {
    setLoot(prev => prev.filter(i => i.key !== key));
  };

  const playerCanAttack =
    playerState.nextAttackTime <= Date.now() &&
    healthPoints > 0 &&
    playerState.stamina >= 5;

  return (
    <>
      <Wrapper
        onAnimationEnd={onAnimationEnd}
        className={isAnimated ? 'animated' : ''}
        onClick={playerCanAttack ? onMobClick : undefined}
      >
        <FlexWide>
          <Avatar
            className={healthPoints > 0 && aggressive ? 'aggressive' : ''}
          >
            {healthPoints > 0 ? icon : <LootBag />}
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
                  <FlexStart>
                    {Boolean(goldAmount) && (
                      <UIBlockInner onClick={onPickGold}>
                        {goldAmount} золото <Click />
                      </UIBlockInner>
                    )}
                    {/*{loot.map((i, key) => (*/}
                    {/*  <UIBlockInner key={key} onClick={onPickItem(key)}>*/}
                    {/*    {i.item.label}*/}
                    {/*  </UIBlockInner>*/}
                    {/*))}*/}
                  </FlexStart>
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

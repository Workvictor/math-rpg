import React, { createRef, FC, memo, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import { Flex, Rythm, UIBlockInner } from '../layout';
import { usePlayerDispatcher } from '../Player/PlayerContext';
import { useHitDispatcher } from '../HitArea/Context';
import { IconButton } from '../Button';
import { useTimeout } from '../utils/useTimeout';
import { Clob } from '../world/Clob';
import { spreadRange } from '../utils/spreadRange';
import { useGameDispatcher } from '../Game/GameContext';
import { Animator } from '../animation/Animator';
import { classJoin } from '../utils/classJoin';
import { Icon } from '../Icon';
import { Avatar } from '../Avatar';
import { HealthBar } from '../StatusBar/HealthBar';

const Wrapper = styled(UIBlockInner)`
  position: relative;
  padding: 6px 6px 6px 10px;
  display: flex;
  width: 100%;
  align-items: flex-start;
  &:after {
    position: absolute;
    content: '';
    pointer-events: none;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    border-radius: inherit;
  }
  &.selected:after {
    box-shadow: inset 0 0 6px rgba(218, 189, 72, 0.56);
  }
  &.disable {
    pointer-events: none;
    filter: grayscale(100%) brightness(30%);
    transform: scale(0.98);
  }
`;

const LootBox = styled.div`
  padding: 2px;
`;

const GoldWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  pointer-events: none;
`;

const Gold = styled(UIBlockInner)`
  width: auto;
  pointer-events: auto;
  background-color: #212121;
  padding: 0 6px 2px;
  box-shadow: inset 0 0 0 1px #020202, 0 5px 7px -5px rgb(162, 124, 24);
`;

const StatsWrapper = styled.div`
  padding: 0 6px;
  width: 100%;
`;

const ColorAvatar = styled(Avatar)`
  &.aggressive {
    color: ${props => props.theme.colors.darkred200};
  }
`;

export const ClickableObject: FC<{
  clob: Clob;
  index: number;
  onLootBoxClose: (index: number) => void;
  onKill: (index: number) => void;

  playerTargetId: number | null;
  playerDamage: number;
  playerCanAttack: boolean;
  playerAttackDelay: number;
}> = memo(props => {
  const hitRef = createRef<HTMLDivElement>();
  const hitRect = useRef<HTMLDivElement>();

  const wrapperRef = createRef<HTMLDivElement>();
  const wrapperRect = useRef<HTMLDivElement>();

  const hitDispatch = useHitDispatcher();

  const gameDispatch = useGameDispatcher();

  const playerDispatch = usePlayerDispatcher();

  const {
    clob,
    index,
    onLootBoxClose,
    onKill,

    playerTargetId,
    playerDamage,
    playerCanAttack,
    playerAttackDelay
  } = props;

  const { level, label, attackTimeout, damage, iconType } = clob;

  const [goldAmount, setGoldAmount] = useState(0);
  const [goldIsPicked, setGoldIsPicked] = useState(false);

  const [closeRequest, setCloseRequest] = useState(false);

  const [isAnimated, setAnimated] = useState(false);

  const [aggressive, setAggressive] = useState(false);

  const [healthPoints, setHealthPoints] = useState(clob.healthPoints);

  useEffect(() => {
    if (wrapperRef.current) {
      wrapperRect.current = wrapperRef.current;
    }
  }, [wrapperRef]);

  useTimeout(
    () => {
      onMobClick();
    },
    playerTargetId === index && playerCanAttack,
    playerAttackDelay
  );

  const onPlayerAttack = () => {
    if (hitRef.current) {
      hitRect.current = hitRef.current;
    }
    if (playerCanAttack) {
      onMobClick();
    } else {
      playerDispatch({
        type: 'setTarget',
        targetId: index
      });
    }
  };

  const onMobClick = () => {
    if (hitRect.current) {
      const rect = hitRect.current.getBoundingClientRect();
      hitDispatch({
        type: 'addHit',
        pageX: rect.left + rect.width / 2,
        pageY: rect.top + rect.height / 2,
        value: playerDamage
      });
    }

    playerDispatch({
      type: 'didAttack',
      targetId: index
    });

    if (!isAnimated) {
      setAnimated(true);
    }

    if (!aggressive && damage > 0) {
      setAggressive(true);
    }

    if (healthPoints - playerDamage <= 0) {
      setHealthPoints(0);
      onKill(index);
      setGoldAmount(spreadRange(clob.goldAmount));
      setAggressive(false);

      playerDispatch({
        type: 'setTarget',
        targetId: null
      });
      playerDispatch({
        type: 'addExp',
        expReward: clob.expReward,
        targetLevel: clob.level
      });

      return;
    }

    setHealthPoints(prev => Math.max(0, prev - playerDamage));
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

  const onShakeEnd = () => {
    setAnimated(false);
  };

  const onCloseLootBox = () => {
    setCloseRequest(true);
  };

  const onPickGold = () => {
    playerDispatch({
      type: 'pickGold',
      amount: goldAmount
    });
    gameDispatch({
      type: 'addClickCount'
    });
    setGoldIsPicked(true);
  };

  const onRemoveGold = () => {
    setGoldAmount(0);
    onCloseLootBox();
  };

  const classes = classJoin([
    playerTargetId === index && 'selected',
    healthPoints <= 0 && 'disable'
  ]);

  const lootBoxClassName = classJoin([healthPoints <= 0 && 'active']);
  const avatarClassName = classJoin([
    healthPoints > 0 && aggressive && 'aggressive'
  ]);

  const onUnmount = () => {
    if (closeRequest) {
      onLootBoxClose(index);
    }
  };

  return (
    <>
      <Animator
        animationDelay={closeRequest ? 0 : index * 200}
        animationName={closeRequest ? 'slideOutRight' : 'slideInRight'}
        onAnimationEnd={onUnmount}
      >
        <LootBox className={lootBoxClassName}>
          <Wrapper ref={wrapperRef} className={classes}>
            <div ref={hitRef}>
              <Animator
                animationName={'shake'}
                play={isAnimated}
                onAnimationEnd={onShakeEnd}
              >
                <ColorAvatar
                  size={56}
                  iconType={iconType}
                  level={level}
                  className={avatarClassName}
                />
              </Animator>
            </div>
            <StatsWrapper>
              <Rythm>{label}</Rythm>
              <Rythm>
                <Flex>
                  <Icon type={'fist'} /> {damage}
                </Flex>
              </Rythm>
              <HealthBar value={healthPoints} max={clob.healthPoints} />
            </StatsWrapper>
            <IconButton
              disable={healthPoints <= 0 && playerTargetId === index}
              onClick={onPlayerAttack}
            >
              <Icon height={'24px'} type={'crossSwords'} />
            </IconButton>
          </Wrapper>
          <GoldWrapper>
            {goldAmount > 0 && (
              <Animator animationName={'drop'} animationDelay={100}>
                <Animator
                  animationName={'fadeOut'}
                  play={goldIsPicked}
                  onAnimationEnd={onRemoveGold}
                >
                  <Gold onClick={onPickGold}>{goldAmount} золото</Gold>
                </Animator>
              </Animator>
            )}
          </GoldWrapper>
        </LootBox>
      </Animator>
    </>
  );
});

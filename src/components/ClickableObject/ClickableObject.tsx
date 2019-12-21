import React, {
  createRef,
  FC,
  memo,
  SyntheticEvent,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react';
import styled from 'styled-components';

import { UIBlockInner } from '../layout';
import { usePlayerDispatcher } from '../Player/PlayerContext';
import { useHitDispatcher } from '../HitArea/Context';
import { useTimeout } from '../utils/useTimeout';
import { Clob } from '../world/Clob';
import { spreadRange } from '../utils/spreadRange';
import { Animator } from '../animation/Animator';
import { Avatar } from '../Avatar';
import { HealthBar } from '../StatusBar/HealthBar';
import { StatValue } from '../StatValue';
import { mathAPS } from '../utils/mathAPS';
import { EColorType } from '../layout/TextColor';
import layout from '../layout/layout.module.scss';

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

export const ClickableObject: FC<{
  clob: Clob;
  index: number;
  damageDealt: number;
  isBoss?: boolean;
  onKill: (index: number, goldAmount: number) => void;
  onTargetMount: (index: number) => void;
}> = memo(props => {
  const hitRef = createRef<HTMLDivElement>();
  const rect = useRef<DOMRect>();

  const hitDispatch = useHitDispatcher();
  const playerDispatch = usePlayerDispatcher();

  const { clob } = props;

  const [isAnimated, setAnimated] = useState(false);

  const [isDead, setIsDead] = useState(false);

  const [healthPoints, setHealthPoints] = useState(clob.healthPoints);

  const setHitRect = useCallback(() => {
    if (hitRef.current && !rect.current) {
      rect.current = hitRef.current.getBoundingClientRect();
    }
  }, [hitRef]);

  const animateDamage = useCallback(
    (hp: number) => {
      if (hp !== healthPoints && rect.current) {
        const damageValue = clob.healthPoints - hp;
        setAnimated(true);
        hitDispatch({
          type: 'addHit',
          pageX: rect.current.left + rect.current.width / 2,
          pageY: rect.current.top + rect.current.height / 2,
          value: damageValue
        });
      }
    },
    [clob.healthPoints, healthPoints, hitDispatch]
  );

  const animateDeath = useCallback(
    (hp: number) => {
      if (hp === 0) {
        setIsDead(true);
        playerDispatch({
          type: 'AddExp',
          expReward: clob.expReward,
          targetLevel: clob.level
        });
        props.onKill(props.index, Math.max(1, spreadRange(clob.goldAmount)));
      }
    },
    [clob.expReward, clob.goldAmount, clob.level, playerDispatch, props]
  );

  useEffect(() => {
    if (!isDead && props.damageDealt > 0) {
      setHitRect();
      const hp = Math.max(0, clob.healthPoints - props.damageDealt);
      animateDamage(hp);
      animateDeath(hp);
      setHealthPoints(hp);
    }
  }, [
    clob.healthPoints,
    isDead,
    props.damageDealt,
    setHitRect,
    animateDamage,
    animateDeath
  ]);

  useTimeout(
    () => {
      playerDispatch({
        type: 'TakeDamage',
        damage: clob.damage
      });
    },
    clob.damage > 0 && healthPoints > 0,
    clob.attackTimeout
  );

  const onShakeEnd = () => {
    setAnimated(false);
  };

  const onAnimationEnd = () => {
    if (!isDead) {
      props.onTargetMount(props.index);
    }
  };

  return (
    <>
      <Animator
        animationName={isDead ? 'slideOutLeft' : 'slideInRight'}
        onAnimationEnd={onAnimationEnd}
      >
        <Wrapper>
          <div ref={hitRef} className={layout.marginRight}>
            <Animator
              animationName={'shake'}
              play={isAnimated}
              onAnimationEnd={onShakeEnd}
            >
              <Avatar size={56} iconType={clob.iconType} level={clob.level} />
            </Animator>
          </div>
          <ul className={layout.cadenceList}>
            <li>
              {clob.label}
              {props.isBoss ? ' - [boss]' : ''}
            </li>
            <li>
              <ul className={layout.columnList}>
                <li>
                  <StatValue
                    colorType={EColorType.physical}
                    icon={'fist'}
                    value={clob.damage}
                  />
                </li>
                <li>
                  <StatValue
                    colorType={EColorType.natural}
                    icon={'sprint'}
                    value={mathAPS(clob.attackTimeout)}
                  />
                </li>
              </ul>
            </li>
            <li>
              <HealthBar value={healthPoints} max={clob.healthPoints} />
            </li>
          </ul>
        </Wrapper>
      </Animator>
    </>
  );
});

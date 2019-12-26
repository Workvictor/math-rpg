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
import { Animator } from '../animation/Animator';
import { Avatar } from '../Avatar';
import { HealthBar } from '../StatusBar/HealthBar';
import { StatValue } from '../StatValue';
import { mathAPS } from '../utils/mathAPS';
import { EColorType } from '../layout/TextColor';
import layout from '../layout/layout.module.scss';
import { TIcons } from '../Icon/icons';

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

interface IProps {
  damageTakenAll: number;
  damage: number;
  healthPoints: number;
  attackDelay: number;
  isDead: boolean;
  icon: TIcons;
  level: number;
  name: string;
  isBoss: boolean;
  hpMax: number;
}

export const ClickableObject: FC<IProps> = memo(mob => {
  const hitRef = createRef<HTMLDivElement>();

  const hitDispatch = useHitDispatcher();
  const playerDispatch = usePlayerDispatcher();

  const [isAnimated, setAnimated] = useState(false);
  const [damageTaken, setDamageTaken] = useState(0);

  const animateDamage = useCallback(
    (value: number) => {
      if (hitRef.current) {
        const rect = hitRef.current.getBoundingClientRect();
        setAnimated(true);
        hitDispatch({
          type: 'addHit',
          pageX: rect.left + rect.width / 2,
          pageY: rect.top + rect.height / 2,
          value
        });
      }
    },
    [hitDispatch, hitRef]
  );

  useEffect(() => {
    if (mob.damageTakenAll > damageTaken) {
      const delta = mob.damageTakenAll - damageTaken;
      setDamageTaken(mob.damageTakenAll);
      animateDamage(delta);
    }
  }, [mob.damageTakenAll, animateDamage, damageTaken]);

  useTimeout(
    () => {
      playerDispatch({
        type: 'TakeDamage',
        damage: mob.damage
      });
    },
    mob.damage > 0 && mob.healthPoints > 0,
    mob.attackDelay
  );

  const onShakeEnd = () => {
    setAnimated(false);
  };

  return (
    <>
      <Animator animationName={mob.isDead ? 'slideOutLeft' : 'slideInRight'}>
        <Wrapper>
          <div ref={hitRef} className={layout.marginRight}>
            <Animator
              animationName={'shake'}
              play={isAnimated}
              onAnimationEnd={onShakeEnd}
            >
              <Avatar size={56} iconType={mob.icon} level={mob.level} />
            </Animator>
          </div>
          <ul className={layout.cadenceList}>
            <li>
              {mob.name}
              {mob.isBoss ? ' - [ boss ]' : ''}
            </li>
            <li>
              <ul className={layout.columnList}>
                <li>
                  <StatValue
                    colorType={EColorType.physical}
                    icon={'fist'}
                    value={mob.damage}
                  />
                </li>
                <li>
                  <StatValue
                    colorType={EColorType.natural}
                    icon={'sprint'}
                    value={mathAPS(mob.attackDelay)}
                  />
                </li>
              </ul>
            </li>
            <li>
              <HealthBar value={mob.healthPoints} max={mob.hpMax} />
            </li>
          </ul>
        </Wrapper>
      </Animator>
    </>
  );
});

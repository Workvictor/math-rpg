import React, { FC, memo } from 'react';
import styled from 'styled-components';

import { BorderElevated, BorderInner } from '../layout';
import { usePlayerDispatcher } from './PlayerContext';
import { Avatar } from '../Avatar';
import { ManaBar } from '../StatusBar/ManaBar';
import { StaminaBar } from '../StatusBar/StaminaBar';
import { ExperienceBar } from '../StatusBar/ExpirienceBar';
import { useTimeout } from '../utils/useTimeout';
import { Health } from './Health';
import layout from '../layout/layout.module.scss';
import { StatValue } from '../StatValue';
import { mathAPS } from '../utils/mathAPS';
import { EColorType } from '../layout/TextColor';
import { usePlayerSelector } from './usePlayerSelector';

const Wrapper = styled(BorderElevated)`
  width: 100%;
  flex-shrink: 0;
  padding: 6px;
  ${props => props.theme.bg.cssMarble};
`;

const Inner = styled(BorderInner)`
  border: 1px solid ${props => props.theme.colors.grey15};
  box-shadow: inset 0 1px 14px ${props => props.theme.colors.grey20},
    0 0 0 1px ${props => props.theme.colors.grey0};
`;

export const Player: FC = memo(() => {
  const state = usePlayerSelector();
  const dispatch = usePlayerDispatcher();

  const {
    level,
    experience,
    experienceNext,
    mana,
    manaMax,
    stamina,
    staminaMax,
    name,
    damage,
    attackDelay,
    healValue,
    statPoints,
    skillPoints
  } = state;

  useTimeout(() => {
    dispatch({
      type: 'RestoreStamina'
    });
  }, stamina < staminaMax);

  return (
    <Wrapper>
      <Inner>
        <div className={layout.flexStart}>
          <div className={layout.fullWidth}>
            <ul className={layout.columnList}>
              <li>
                <StatValue
                  colorType={EColorType.physical}
                  icon={'fist'}
                  value={damage}
                />
              </li>
              <li>
                <StatValue
                  colorType={EColorType.natural}
                  icon={'sprint'}
                  value={mathAPS(attackDelay)}
                />
              </li>
              <li>
                <StatValue
                  colorType={EColorType.mental}
                  icon={'healPlus'}
                  value={healValue}
                />
              </li>
            </ul>
            <hr className={layout.divider} />
          </div>
        </div>
        <div className={layout.flexStart}>
          <Avatar
            iconType={'cementShoes'}
            level={level}
            className={layout.marginRight}
          />
          <ul className={layout.cadenceList}>
            <li>{name}</li>
            <li>
              <Health />
            </li>
            <li>
              <ManaBar value={mana} max={manaMax} />
            </li>
            <li>
              <StaminaBar value={stamina} max={staminaMax} />
            </li>
          </ul>
        </div>
        <ExperienceBar value={experience} max={experienceNext} />
      </Inner>
    </Wrapper>
  );
});

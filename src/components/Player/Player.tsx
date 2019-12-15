import React, { FC, memo } from 'react';
import styled from 'styled-components';

import { BorderElevated, BorderInner } from '../layout';
import { usePlayerContext, usePlayerDispatcher } from './PlayerContext';
import { Avatar } from '../Avatar';
import { Button } from '../Button';
import { ManaBar } from '../StatusBar/ManaBar';
import { StaminaBar } from '../StatusBar/StaminaBar';
import { ExperienceBar } from '../StatusBar/ExpirienceBar';
import { useTimeout } from '../utils/useTimeout';
import { Health } from './Health';
import layout from '../layout/layout.module.scss';
import { Icon } from '../Icon';
import { StatValue } from '../StatValue';
import { mathAPS } from '../utils/mathAPS';

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
  const { state } = usePlayerContext();
  const dispatch = usePlayerDispatcher();

  const {
    level,
    exp,
    expMax,
    mana,
    manaMax,
    stamina,
    staminaMax,
    name,
    damage,
    attackDelay,
    healValue
  } = state;

  useTimeout(() => {
    dispatch({
      type: 'restoreStamina'
    });
  }, stamina < staminaMax);

  return (
    <Wrapper>
      <Inner>
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
        <div className={layout.flexStart}>
          <div className={layout.fullWidth}>
            <ul className={layout.columnList}>
              <li>
                <StatValue
                  colorType={'physical'}
                  icon={'fist'}
                  value={damage}
                />
              </li>
              <li>
                <StatValue
                  colorType={'natural'}
                  icon={'sprint'}
                  value={mathAPS(attackDelay)}
                />
              </li>
              <li>
                <StatValue
                  colorType={'mental'}
                  icon={'healPlus'}
                  value={healValue}
                />
              </li>
            </ul>
            <ExperienceBar value={exp} max={expMax} />
          </div>
          <Button to={`/${name}/info`} className={layout.typography4}>
            <Icon type={'skills'} className={layout.marginRight} />
            skills
          </Button>
        </div>
      </Inner>
    </Wrapper>
  );
});

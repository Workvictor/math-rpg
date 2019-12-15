import React, { FC, memo } from 'react';
import styled from 'styled-components';

import { BorderElevated, BorderInner } from '../layout';
import { usePlayerContext, usePlayerDispatcher } from '../Player/PlayerContext';
import { Button } from '../Button';
import { ManaBar } from '../StatusBar/ManaBar';
import { StaminaBar } from '../StatusBar/StaminaBar';
import { ExperienceBar } from '../StatusBar/ExpirienceBar';
import { useTimeout } from '../utils/useTimeout';
import { Icon } from '../Icon';
import { StatValue } from '../StatValue';
import { SmoothScroll } from '../SmoothScroll';
import layout from '../layout/layout.module.scss';
import { mathAPS } from '../utils/mathAPS';
import { useGameContext } from '../Game/GameContext';

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

export const Stats: FC = memo(() => {
  const gameContext = useGameContext();
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
    healValue,
    healthPoints,
    healthPointsMax,
    healRefreshTimeout,
    agility,
    strength,
    intelligence,
    goldAmount,
    skillPoints
  } = state;

  useTimeout(() => {
    dispatch({
      type: 'restoreStamina'
    });
  }, stamina < staminaMax);

  return (
    <>
      <section>
        <h1>{name} характеристики</h1>
        <ul className={layout.statTable}>
          <li>
            <Icon type={'skills'} />
            level
            <hr />
            {level}
          </li>
          <li>
            <Icon type={'strong'} />
            strength
            <hr />
            {strength}
          </li>
          <li>
            <Icon type={'agility'} />
            agility
            <hr />
            {agility}
          </li>
          <li>
            <Icon type={'smart'} />
            intelligence
            <hr />
            {intelligence}
          </li>
          <li>
            <Icon type={'heart'} />
            health
            <hr />
            {healthPoints}/{healthPointsMax}
          </li>
          <li>
            <Icon type={'electric'} />
            mana
            <hr />
            {mana}/{manaMax}
          </li>
          <li>
            <Icon type={'walk'} />
            stamina
            <hr />
            {stamina}/{staminaMax}
          </li>
          <li>
            <Icon type={'fist'} />
            physical damage
            <hr />
            {damage}
          </li>
          <li>
            <Icon type={'sprint'} />
            attacks per second
            <hr />
            {mathAPS(attackDelay)}aps
          </li>
          <li>
            <Icon type={'healPlus'} />
            heal value
            <hr />
            {healValue}
          </li>
          <li>
            <Icon type={'healPlus'} />
            heal refresh timeout
            <hr />
            {Math.floor(healRefreshTimeout / 1000)}s
          </li>
          <li>
            <Icon type={'info'} />
            experience
            <hr />
            {exp}/{expMax}
          </li>
          <li>
            <Icon type={'click'} />
            clicks
            <hr />
            {gameContext.clickCount}
          </li>
          <li>
            <Icon type={'lootBag'} />
            gold
            <hr />
            {goldAmount}
          </li>
        </ul>
      </section>
    </>
  );
});

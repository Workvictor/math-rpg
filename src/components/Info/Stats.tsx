import React, { FC } from 'react';

import { usePlayerContext, usePlayerDispatcher } from '../Player/PlayerContext';
import { useTimeout } from '../utils/useTimeout';
import { Icon } from '../Icon';
import { mathAPS } from '../utils/mathAPS';
import { useGameContext } from '../Game/GameContext';
import layout from '../layout/layout.module.scss';
import styles from './styles.module.scss';
import { IconButton } from '../Button';
import { usePlayerSelector } from '../Player/usePlayerSelector';

export const Stats: FC = () => {
  const gameContext = useGameContext();
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
    healthPoints,
    healthPointsMax,
    healRefreshTimeout,
    agility,
    physique,
    spirit,
    goldAmount,
    statPoints,
    critChance,
    skillPoints
  } = usePlayerSelector();

  useTimeout(() => {
    dispatch({
      type: 'RestoreStamina'
    });
  }, stamina < staminaMax);

  const onAddStrength = () => {
    dispatch({
      type: 'UpgradeStat',
      amount: 1,
      statName: 'physique'
    });
  };
  const onAddAgility = () => {
    dispatch({
      type: 'UpgradeStat',
      amount: 1,
      statName: 'agility'
    });
  };
  const onAddIntelligence = () => {
    dispatch({
      type: 'UpgradeStat',
      amount: 1,
      statName: 'spirit'
    });
  };

  return (
    <>
      <section>
        <h1>{name} характеристики</h1>
        <hr />
        {statPoints > 0 && <span>не распределенные очки ({statPoints})</span>}

        <ul className={styles.mainStats}>
          <li>
            <span>
              <Icon type={'strong'} />
              physique
              <hr />
              {physique}
            </span>
            <IconButton onClick={onAddStrength} disable={statPoints <= 0}>
              <Icon type={'healPlus'} />
            </IconButton>
          </li>
          <li>
            <span>
              <Icon type={'agility'} />
              agility
              <hr />
              {agility}
            </span>
            <IconButton onClick={onAddAgility} disable={statPoints <= 0}>
              <Icon type={'healPlus'} />
            </IconButton>
          </li>
          <li>
            <span>
              <Icon type={'smart'} />
              spirit
              <hr />
              {spirit}
            </span>
            <IconButton onClick={onAddIntelligence} disable={statPoints <= 0}>
              <Icon type={'healPlus'} />
            </IconButton>
          </li>
        </ul>
        <hr />
        <ul className={styles.stats}>
          <li>
            <Icon type={'skills'} />
            level
            <hr />
            {level}
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
            <Icon type={'bladeDrag'} />
            crit chance
            <hr />
            {critChance}%
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
            {experience}/{experienceNext}
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
};

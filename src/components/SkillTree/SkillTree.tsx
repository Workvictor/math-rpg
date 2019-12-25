import React, { useState } from 'react';

import { IPlayerStats } from '../Player/store/IPlayerStats';
import { TIcons } from '../Icon/icons';
import { Icon } from '../Icon';
import { SmoothScroll } from '../SmoothScroll';
import layout from '../layout/layout.module.scss';
import styles from './styles.module.scss';
import { UiFrame } from '../UiFrame';
import { BorderInner } from '../layout';
import { Avatar } from '../Avatar';
import { Button } from '../Button';
import { usePlayerDispatcher } from '../Player/PlayerContext';

type PerkType = 'addFlatAmount' | 'addPercentAmount';

const createPerkDescription = (type: PerkType, description: string) => {
  return {
    type,
    description
  };
};

const descriptionByPerkType = [
  createPerkDescription(
    'addFlatAmount',
    'adds a small amount of points to the main character characteristics'
  )
];

type StatName = keyof IPlayerStats;

interface FlatAmount {
  type: 'flat';
  value: number;
}

interface PercentAmount {
  type: 'percent';
  value: number;
}

type StatAmount = PercentAmount | FlatAmount;

const createBonus = (statName: StatName, amount: StatAmount) => {
  return {
    statName,
    amount
  };
};

const createPerk = (
  name: string,
  type: PerkType,
  icon: TIcons,
  bonus: ReturnType<typeof createBonus>
) => {
  return {
    name,
    icon,
    description: descriptionByPerkType
      .filter(i => i.type === type)
      .map(i => i.description)
      .join(''),
    bonus
  };
};

const perks = [
  createPerk(
    'athlete',
    'addFlatAmount',
    'strong',
    createBonus('physique', {
      type: 'flat',
      value: 10
    })
  ),
  createPerk(
    'intellectual',
    'addFlatAmount',
    'smart',
    createBonus('spirit', {
      type: 'flat',
      value: 10
    })
  ),
  createPerk(
    'dexterous',
    'addFlatAmount',
    'agility',
    createBonus('agility', {
      type: 'flat',
      value: 10
    })
  )
];

export const SkillTree = () => {
  const playerDispatcher = usePlayerDispatcher();
  const [] = useState();
  console.log(perks);

  const onUpgradeStat = (
    statName: keyof IPlayerStats,
    amount: number
  ) => () => {
    playerDispatcher({
      type: 'UpgradeStat',
      amount,
      statName
    });
  };

  return (
    <div>
      SkillTree
      <SmoothScroll type={'horizontal'}>
        <div className={layout.flexStretch}>
          {perks.map(perk => (
            <div key={perk.name} className={styles.card}>
              <UiFrame className={styles.frame}>
                <ul className={layout.cadenceList}>
                  <li>
                    <Avatar iconType={perk.icon} />
                  </li>
                  <li>
                    <div className={layout.cadence3}>{perk.name}</div>
                  </li>
                  <li>
                    <div className={layout.cadence3}>{perk.description}</div>
                  </li>
                  <li>
                    <Button
                      onClick={onUpgradeStat(
                        perk.bonus.statName,
                        perk.bonus.amount.value
                      )}
                    >
                      select perk
                    </Button>
                  </li>
                </ul>
              </UiFrame>
            </div>
          ))}
        </div>
      </SmoothScroll>
    </div>
  );
};

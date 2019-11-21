import React, { FC, useEffect, useState } from 'react';

import { UIBlockInner } from '../layout';
import { locations, towns } from '../../store/world';
import styled from 'styled-components';

const Wrapper = styled(UIBlockInner)`
  opacity: 0.45;
  &.active {
    opacity: 1;
    &:hover {
      outline: 1px solid goldenrod;
    }
  }
`;

interface IMobKey {
  index?: number;
}

export interface IMobView extends IMobKey {
  levelRange: number[];
  playerHp: number;
  playerDmg: number;
}

export interface IMobAttack extends IMobKey {
  damage: number;
  expRewardForKill: number;
}

interface IMobAction {
  onAttack: (attack: IMobAttack) => void;
}

export const MobView: FC<IMobView & IMobAction> = props => {
  const { playerHp, playerDmg, levelRange, onAttack, index } = props;

  const [level] = useState(
    Math.floor(levelRange[0] + Math.random() * levelRange[1])
  );
  const [name] = useState(`mob_name_${Math.ceil(Math.random() * 100)}`);

  const healthPoints = 40 + (level - 1) * 6;
  const expRewardForKill = Math.floor(healthPoints * 0.4);
  const damage = 6 + (level - 1) * 2;
  const hits = Math.ceil(healthPoints / playerDmg);
  const active = playerHp - damage * hits > 0;

  const onMobClick = () => {
    onAttack({
      damage,
      expRewardForKill,
      index
    });
  };

  return (
    <Wrapper
      className={active ? 'active' : ''}
      onClick={active ? onMobClick : undefined}
    >
      <div>{name}</div>
      <div>Урон: {damage}</div>
      <div>Здоровье: {healthPoints}</div>
    </Wrapper>
  );
};

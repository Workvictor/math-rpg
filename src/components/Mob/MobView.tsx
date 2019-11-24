import React, { FC, useState } from 'react';

import { Border, FlexBetween, FlexWide, UIBlockInner } from '../layout';
import styled from 'styled-components';
import { mobTypes } from './mobTypes';
import { SvgIcon } from '../icons';

const Stats = styled(FlexBetween)`
  padding: 2px;
`;

const StatsWrapper = styled.div`
  padding: 0 4px;
  width: 100%;
`;

const Avatar = styled(Border)`
  font-size: 32px;
  display: flex;
  color: ${props => props.theme.colors.grey60};
  flex-shrink: 0;
`;

const Wrapper = styled(UIBlockInner)`
  opacity: 0.45;
  color: ${props => props.theme.colors.grey70};
  &.active {
    opacity: 1;
    color: inherit;
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

  const availableMobTypes = mobTypes.filter(item => item.level.includes(level));

  const mob =
    availableMobTypes[Math.floor(Math.random() * availableMobTypes.length)];

  const healthPoints = Math.floor(
    (20 + (level - 1) * 4) * mob.healthPointValue
  );
  const expRewardForKill = Math.floor(healthPoints * 0.4);
  const damage = Math.floor((4 + (level - 1) * 1.2) * mob.damageValue);
  const hits = Math.ceil(healthPoints / playerDmg);
  const active = playerHp - damage * hits > 0;

  const onMobClick = () => {
    onAttack({
      damage: -damage * hits,
      expRewardForKill,
      index
    });
  };

  return (
    <Wrapper
      className={active ? 'active' : ''}
      onClick={active ? onMobClick : undefined}
    >
      <FlexWide>
        <Avatar>
          <SvgIcon type={mob.icon} />
        </Avatar>
        <StatsWrapper>
          <Stats>
            <div>{mob.name}</div>
            <div>Уровень: {level}</div>
          </Stats>
          <Stats>
            <div>Урон: {damage}</div>
            <div>Здоровье: {healthPoints}</div>
          </Stats>
        </StatsWrapper>
      </FlexWide>
    </Wrapper>
  );
};

import React, { FC, useEffect, useState } from 'react';
import { Redirect, RouteComponentProps } from 'react-router';
import styled from 'styled-components';

import { Rythm, UIBlockInner } from '../layout';
import { locations, towns } from '../../store/world';
import { Character } from '../Character';
import { MobView } from '../Mob';
import { IMobAttack } from '../Mob/MobView';
import { useGameProvider } from '../../hooks/useGameProvider';

export const Adventure: FC<
  RouteComponentProps<{ id: string; gameName: string }>
> = props => {
  const {
    match: {
      params: { id, gameName }
    }
  } = props;

  const { updateGame, state } = useGameProvider();

  const player = state.game[gameName];

  const loc = locations.find(item => item.id === id);

  const [mobIds, setMobIds] = useState(new Array(10).fill(0).map((_, i) => i));

  // levelUp
  useEffect(() => {
    if (player.exp >= player.level * 100) {
      updateGame(gameName, prevGameState => {
        const nextHpMax = prevGameState.healthPointsMax + 12;
        return {
          level: prevGameState.level + 1,
          healthPointsMax: nextHpMax,
          healthPoints: nextHpMax
        };
      });
    }
  }, [gameName, player.exp, player.level, updateGame]);

  const onAttack = (attack: IMobAttack) => {
    const { damage, expRewardForKill, index = 0 } = attack;
    setMobIds(prev => prev.filter(item => item !== index));
    updateGame(gameName, prevGameState => ({
      healthPoints: prevGameState.healthPoints + damage,
      exp: prevGameState.exp + expRewardForKill
    }));
  };

  return loc ? (
    <>
      <UIBlockInner>
        Приключение
        <div>{loc.name}</div>
        <div>Уровень монстров: {loc.level.join(' - ')}</div>
      </UIBlockInner>
      <Character name={gameName} />
      {mobIds.map(key => {
        return (
          <Rythm key={key}>
            <MobView
              levelRange={loc.level}
              onAttack={onAttack}
              index={key}
              playerHp={player.healthPoints}
              playerDmg={player.damage}
            />
          </Rythm>
        );
      })}
    </>
  ) : (
    <Redirect to={`/${gameName}/${towns[0].id}`} />
  );
};

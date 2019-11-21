import React, { FC, useEffect, useState } from 'react';
import { Redirect, RouteComponentProps } from 'react-router';
import styled from 'styled-components';

import { Rythm, UIBlockInner } from '../layout';
import { locations, towns } from '../../store/world';
import { Character } from '../Character';
import { MobView } from '../Mob';
import { IMobAttack } from '../Mob/MobView';

export const Adventure: FC<
  RouteComponentProps<{ id: string; gameName: string }>
> = props => {
  const {
    match: {
      params: { id, gameName }
    }
  } = props;
  const loc = locations.find(item => item.id === id);

  const playerDmg = 6;
  const [playerHpMax, setPlayerHpMax] = useState(100);
  const [playerLevel, setPlayerLevel] = useState(1);
  const [playerExp, setPlayerExp] = useState(1);
  const [playerHp, setPlayerHp] = useState(100);

  const [mobIds, setMobIds] = useState(new Array(10).fill(0).map((_, i) => i));

  useEffect(() => {
    if (playerExp >= playerLevel * 100) {
      setPlayerLevel(prev => prev + 1);
      setPlayerHpMax(prev => prev + 12);
    }
  }, [playerExp, playerLevel]);

  useEffect(() => {
    setPlayerHp(playerHpMax);
  }, [playerHpMax]);

  const onAttack = (attack: IMobAttack) => {
    const { damage, expRewardForKill, index = 0 } = attack;
    setMobIds(prev => prev.filter(item => item !== index));
    setPlayerHp(prev => prev + damage);
    setPlayerExp(prev => prev + expRewardForKill);
  };

  return loc ? (
    <>
      <UIBlockInner>
        Приключение
        <div>{loc.name}</div>
        <div>Уровень монстров: {loc.level.join(' - ')}</div>
      </UIBlockInner>
      <Character
        name={gameName}
        healthPoints={playerHp}
        healthPointsMax={playerHpMax}
        attack={playerDmg * playerLevel}
        exp={playerExp}
        expMax={playerLevel * 100}
        level={playerLevel}
      />
      {mobIds.map(key => {
        return (
          <Rythm key={key}>
            <MobView
              levelRange={loc.level}
              onAttack={onAttack}
              index={key}
              playerHp={playerHp}
              playerDmg={playerDmg}
            />
          </Rythm>
        );
      })}
    </>
  ) : (
    <Redirect to={`/${gameName}/${towns[0].id}`} />
  );
};

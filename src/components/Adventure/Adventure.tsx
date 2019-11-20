import React, { FC, useEffect, useState } from 'react';
import { Redirect, Route, RouteComponentProps, Switch } from 'react-router';

import { UIBlockInner } from '../layout';
import { locations, towns } from '../../store/world';
import { Character } from '../Character';

export const Adventure: FC<
  RouteComponentProps<{ id: string; gameName: string }>
> = props => {
  const {
    match: {
      params: { id, gameName }
    }
  } = props;
  const loc = locations.find(item => item.id === id);
  const levelMin = loc ? loc.level[0] : 0;
  const levelMax = loc ? loc.level[1] : 0;

  const playerDmg = 6;
  const [playerHpMax, setPlayerHpMax] = useState(100);
  const [playerLevel, setPlayerLevel] = useState(1);
  const [playerExp, setPlayerExp] = useState(1);
  const [playerHp, setPlayerHp] = useState(100);

  const [mobs, setMobs] = useState(
    new Array(10).fill(0).map((_, i) => {
      const level = Math.ceil(levelMin + Math.random() * (levelMax - levelMin));
      return {
        name: `mob_${i}`,
        id: i,
        level,
        hp: level * 12,
        exp: level * 8
      };
    })
  );

  const onMobClick = (delta: number, mobId: number) => () => {
    const index = mobs.findIndex(item => item.id === mobId);
    if (index >= 0) {
      setPlayerHp(prev => prev + delta);
      setPlayerExp(prev => prev + mobs[index].exp);
      setMobs(prev => [...prev.slice(0, index), ...prev.slice(index + 1)]);
    }
  };

  useEffect(() => {
    if (playerExp >= playerLevel * 100) {
      setPlayerLevel(prev => prev + 1);
      setPlayerHpMax(prev => prev + 12);
    }
  }, [playerExp, playerLevel]);

  useEffect(() => {
    setPlayerHp(playerHpMax);
  }, [playerHpMax]);

  console.log(playerExp, playerLevel * 100);

  return loc ? (
    <>
      <Character
        healthPoints={playerHp}
        healthPointsMax={playerHpMax}
        name={gameName}
      />
      <UIBlockInner>
        Приключение
        <div>{loc.name}</div>
        <div>Уровень монстров: {loc.level.join(' - ')}</div>
      </UIBlockInner>
      {mobs.map(mob => {
        const hits = Math.ceil(mob.hp / (playerDmg * playerLevel));
        const delta = -mob.level * hits;
        return (
          <UIBlockInner onClick={onMobClick(delta, mob.id)}>
            <div>{mob.name}</div>
            <div>
              Атака: {`${mob.level}`} ({`${delta}`})
            </div>
            <div>Здоровье: {`${mob.hp}`}</div>
          </UIBlockInner>
        );
      })}
    </>
  ) : (
    <Redirect to={`/${gameName}/${towns[0].id}`} />
  );
};

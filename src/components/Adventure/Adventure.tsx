import React, { FC, useEffect, useState } from 'react';
import { Redirect, RouteComponentProps } from 'react-router';
import styled from 'styled-components';

import {
  BorderInner,
  Flex,
  Padbox,
  Rythm,
  ScrollArea,
  UIBlockInner
} from '../layout';
import { locations, towns } from '../Game/world';
import { Character } from '../Character';
import { MobView } from '../Mob';
import { IMobAttack } from '../Mob/MobView';
import { useGameProvider } from '../Game';
import { Divider } from '../layout/Divider';
import { Button } from '../Button';

export const Adventure: FC<RouteComponentProps<{
  id: string;
  gameName: string;
}>> = props => {
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
    if (player.exp >= player.expMax) {
      updateGame(gameName, prevGameState => {
        const nextHpMax = prevGameState.healthPointsMax + 12;
        const nextLevel = prevGameState.level + 1;
        return {
          level: nextLevel,
          skillPoints: prevGameState.skillPoints + 1,
          healthPointsMax: nextHpMax,
          healthPoints: nextHpMax,
          expMax: prevGameState.expMax + nextLevel * 100,
          damage: Math.floor(prevGameState.damage + nextLevel * 1.2)
        };
      });
    }
  }, [gameName, player.exp, player.expMax, player.level, updateGame]);

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
      <BorderInner>
        <UIBlockInner>
          <Padbox>
            <div>Режим: приключения</div>
            <div>Локация: {loc.name}</div>
            <div>Уровень монстров: {loc.level.join(' - ')}</div>
          </Padbox>
        </UIBlockInner>
        <Character name={gameName} />
        <Padbox>
          Действия:
          <Divider />
          <Flex>
            <Button to={`/${gameName}/${id}`}>в город</Button>
          </Flex>
        </Padbox>
      </BorderInner>
      <Divider />

      <ScrollArea>
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
      </ScrollArea>
    </>
  ) : (
    <Redirect to={`/${gameName}/${towns[0].id}`} />
  );
};

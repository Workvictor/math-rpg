import React, { FC, useState } from 'react';
import { Redirect, RouteComponentProps } from 'react-router';

import {
  BorderInner,
  Flex,
  Padbox,
  Rythm,
  ScrollArea,
  UIBlockInner
} from '../layout';
import { rooms, locations } from '../Game/world';
import { Character } from '../Character';
import { MobView } from '../Mob';
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

  const loc = rooms.find(item => item.id === id);

  const [mobIds, setMobIds] = useState(new Array(10).fill(0).map((_, i) => i));

  const onMobDeath = (mobId: number) => {
    setMobIds(prev => prev.filter(item => item !== mobId));
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
        <Character />
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
                onDeath={onMobDeath}
                levelRange={loc.level}
                index={key}
              />
            </Rythm>
          );
        })}
      </ScrollArea>
    </>
  ) : (
    <Redirect to={`/${gameName}/${locations[0].id}`} />
  );
};

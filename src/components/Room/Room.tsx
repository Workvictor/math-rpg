import React, { FC, useState } from 'react';
import { Redirect, useRouteMatch } from 'react-router';

import { BorderInner, Padbox, Rythm, ScrollArea } from '../layout';
import { rooms, locations } from '../Game/world';
import { Character } from '../Character';
import { ClickableObject } from '../ClickableObject';
import { Divider } from '../layout/Divider';
import { Button } from '../Button';
import { TabLabel } from '../TabLabel';

export const Room: FC = () => {
  const {
    params: { roomName, gameName, locationName }
  } = useRouteMatch<{
    locationName: string;
    roomName: string;
    gameName: string;
  }>();

  const room = rooms.find(item => item.name === roomName);
  const count = room ? room.objectCount : 0;

  const [mobIds, setMobIds] = useState(
    new Array(count).fill(0).map((_, i) => i)
  );

  const onMobDeath = (mobId: number) => {
    setMobIds(prev => prev.filter(item => item !== mobId));
  };

  return room ? (
    <>
      <TabLabel
        label={
          <>
            {room.name} [{room.level.join('-')}]
          </>
        }
      >
        <Button to={`/${gameName}/locations/${locationName}`}>выход</Button>
      </TabLabel>
      <BorderInner>
        <Character />
        <Padbox>
          <Divider />
        </Padbox>
      </BorderInner>
      <Divider />

      <ScrollArea>
        {mobIds.map(key => {
          return (
            <Rythm key={key}>
              <ClickableObject
                onDeath={onMobDeath}
                levelRange={room.level}
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

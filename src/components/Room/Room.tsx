import React, { FC, useState } from 'react';
import { Redirect, useRouteMatch } from 'react-router';

import { BorderInner, Flex, Padbox, Rythm, ScrollArea } from '../layout';
import { rooms, locations } from '../Game/world';
import { Character } from '../Character';
import { MobView } from '../Mob';
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

  const [mobIds, setMobIds] = useState(new Array(10).fill(0).map((_, i) => i));

  const onMobDeath = (mobId: number) => {
    setMobIds(prev => prev.filter(item => item !== mobId));
  };

  return room ? (
    <>
      <BorderInner>
        <TabLabel
          label={
            <>
              <Flex>
                <Button to={`/${gameName}/location/${locationName}`}>
                  вернуться
                </Button>
                <div>
                  {room.name} [${room.level.join('-')}]
                </div>
              </Flex>
            </>
          }
        />
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
              <MobView
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

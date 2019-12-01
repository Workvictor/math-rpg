import React, { FC, useState } from 'react';
import { Redirect, useRouteMatch } from 'react-router';

import { BorderInner, Padbox, Rythm, ScrollArea } from '../layout';
import { rooms, locations } from '../Game/world';
import { Character } from '../Character';
import { ClickableObject } from '../ClickableObject';
import { Divider } from '../layout/Divider';
import { Button } from '../Button';
import { TabLabel } from '../TabLabel';
import { HitArea } from '../HitArea';
import { HitContextProvider } from '../HitArea/Context';
import { usePlayerContext } from '../Player/PlayerContext';

const Rew: FC<{ to: string }> = ({ to }) => {
  const { dispatch } = usePlayerContext();
  const onPickSpecialLoot = () => {
    dispatch({
      type: 'addUnlockedLocation',
      locationId: 1
    });
  };
  return (
    <Button to={to} onClick={onPickSpecialLoot}>
      собрать
    </Button>
  );
};

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
      <HitContextProvider>
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
          {mobIds.length === 0 && (
            <div>
              молодец, всех победил!{' '}
              {room.specialLoot && (
                <div>
                  можешь забрать [{room.specialLoot.name}]
                  <div>
                    <Rew to={`/${gameName}/locations`} />
                  </div>
                </div>
              )}
            </div>
          )}
        </ScrollArea>
        <HitArea />
      </HitContextProvider>
    </>
  ) : (
    <Redirect to={`/${gameName}/${locations[0].id}`} />
  );
};

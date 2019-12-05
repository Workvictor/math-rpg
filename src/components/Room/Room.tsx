import React, { FC, useState } from 'react';

import { BorderInner, Padbox, Rythm, ScrollArea } from '../layout';
import { IRoom } from '../world/world';
import { Player } from '../Player';
import { ClickableObject } from '../ClickableObject';
import { Divider } from '../layout/Divider';
import { Button } from '../Button';
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

export const Room: FC<{ room: IRoom }> = ({ room, children }) => {
  const { objectCount, clobs, levelRange } = room;
  const countDelta = objectCount * 0.3;
  const count = Math.round(
    objectCount - countDelta + Math.random() * (room.objectCount + countDelta)
  );

  const [mobIds, setMobIds] = useState(
    new Array(count).fill(0).map((_, key) => ({
      key,
      clob: clobs[
        Math.max(0, Math.round(Math.random() * clobs.length - 1))
      ].setLevel(Math.round(levelRange[0] + Math.random() * levelRange[1]))
    }))
  );

  const onMobDeath = (index: number) => () => {
    setMobIds(prev => prev.filter(item => item.key !== index));
  };

  return (
    <>
      <HitContextProvider>
        {children}
        <BorderInner>
          <Player />
          <Padbox>
            <Divider />
          </Padbox>
        </BorderInner>
        <Divider />

        <ScrollArea>
          {mobIds.map(i => {
            return (
              <Rythm key={i.key}>
                <ClickableObject
                  clob={i.clob}
                  onDeath={onMobDeath(i.key)}
                  index={i.key}
                />
              </Rythm>
            );
          })}
          {mobIds.length === 0 && (
            <div>
              молодец, всех победил!
              {/*{room.specialLoot && (*/}
              {/*  <div>*/}
              {/*    можешь забрать [{room.specialLoot.name}]*/}
              {/*    <div>*/}
              {/*      <Rew to={`/${gameName}/locations`} />*/}
              {/*    </div>*/}
              {/*  </div>*/}
              {/*)}*/}
            </div>
          )}
        </ScrollArea>
        <HitArea />
      </HitContextProvider>
    </>
  );
};

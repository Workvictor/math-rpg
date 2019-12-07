import React, { FC, useEffect, useState } from 'react';

import { BorderInner, Padbox, Rythm, ScrollArea } from '../layout';
import { IRoom } from '../world/world';
import { Player } from '../Player';
import { ClickableObject } from '../ClickableObject';
import { Divider } from '../layout/Divider';
import { Button } from '../Button';
import { HitArea } from '../HitArea';
import { HitContextProvider } from '../HitArea/Context';
import { usePlayerContext } from '../Player/PlayerContext';
import { randomValueFromRange } from '../utils/randomValueFromRange';
import { Clob } from '../world/Clob';
import { spreadRange } from '../utils/spreadRange';
import { randomElementFrom } from '../utils/randomElementFrom';

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
  const { dispatch } = usePlayerContext();

  const { objectCount, clobs, levelRange, unlocksLocation } = room;

  const [objects, setObjects] = useState<{ key: number; clob: Clob }[]>([]);

  useEffect(() => {
    setObjects(
      new Array(spreadRange(objectCount, 0.3)).fill(0).map((_, key) => ({
        key,
        clob: randomElementFrom(clobs).setLevel(
          randomValueFromRange(levelRange)
        )
      }))
    );
  }, [clobs, levelRange, objectCount]);

  const onMobDeath = (index: number) => () => {
    setObjects(prev => prev.filter(item => item.key !== index));
  };

  useEffect(() => {
    if (objects.length === 0 && unlocksLocation) {
      dispatch({
        type: 'addUnlockedLocation',
        locationId: unlocksLocation
      });
    }
  }, [dispatch, objects, unlocksLocation]);

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
          {objects.map(i => {
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
          {objects.length === 0 && <div>молодец, всех победил!</div>}
        </ScrollArea>
        <HitArea />
      </HitContextProvider>
    </>
  );
};

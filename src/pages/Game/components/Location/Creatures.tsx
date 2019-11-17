import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { FlexColumnWide, UIBlockInner } from '../import';
import { Route, RouteComponentProps, Switch } from 'react-router';
import { Tab } from '../../../../components/layout/Tab';
import { Rythm } from '../../../../components/layout';
import { Quest } from '../../../Quest';
import { Character } from '../Character';
import { Questbook } from '../Questbook';
import { TabLabel } from '../../../../components/TabLabel';
import { Player } from '../../../../components/Player';

interface ICreature {
  id: string;
  name: string;
  hp: number;
  dmg: number;
}

interface ILocation {
  name: string;
  creatureIds: string[];
}

const creatures: { [key: string]: ICreature } = {
  '1': {
    id: '1',
    name: 'Kobold',
    hp: 10,
    dmg: 2
  }
};

type TLocation = 'northshire' | 'elvin';

export const locations: { [key in TLocation]: ILocation } = {
  northshire: {
    name: 'northshire',
    creatureIds: ['1', '1', '1', '1'].map((id, index) => `${id}-${index}`)
  },
  elvin: {
    name: 'elvin',
    creatureIds: ['1', '1', '1', '1'].map((id, index) => `${id}-${index}`)
  }
};

const CreatureWrapper = styled(Rythm.withComponent(UIBlockInner))`
  :hover {
    box-shadow: inset 0 0 0 0 #131313, inset 0 0 0 1px #0c0c0c,
      inset 0 0 12px 2px rgba(86, 86, 86, 0.61);
  }
`;

export const Creatures = ({
  match: {
    params: { gameName, location }
  }
}: RouteComponentProps<{ gameName: string; location: TLocation }>) => {
  const fromUrl = ['', gameName, location].join('/');
  const [hp, setHp] = useState(100);
  const hpmax = 100;
  const playerDmg = 5;
  const playerAttackSpeed = 0.5;
  const attackDelay = 1000 / playerAttackSpeed;
  const attackDeltaMod = 10;
  const attackDelta = attackDelay / attackDeltaMod;
  const [reloadProgress, setReloadProgress] = useState<number>(1.0); // 0.0-1.0
  const [reload, setReload] = useState<boolean>(true);
  const [attackTime, setAttackTime] = useState(Date.now());

  const [mobhp, setMobHp] = useState(100);
  const mobhpmax = 100;
  const mobdmg = 5;

  const onAttack = () => {
    if (Date.now() >= attackTime) {
      setAttackTime(Date.now() + attackDelay);
      setReloadProgress(0);

      if (mobhp > 0) {
        setMobHp(prevState => prevState - playerDmg);
      }
    }
  };

  useEffect(() => {
    let timer = 0;
    if (reloadProgress < 1.0) {
      timer = setTimeout(() => {
        setReloadProgress(1 - (attackTime - Date.now()) / attackDelay);
      }, attackDelta);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [reloadProgress, attackDelta, attackTime, attackDelay]);

  return (
    <>
      <TabLabel label={'Adventure'} fromUrl={fromUrl} />
      <Rythm>
        <Player
          reloadProgress={reloadProgress}
          healthPointsMax={hpmax}
          healthPoints={hp}
          name={gameName}
        />
      </Rythm>
      <CreatureWrapper onClick={onAttack}>
        mob
        <div>
          {mobhp}/{mobhpmax}
        </div>
        <div>{mobdmg}</div>
      </CreatureWrapper>
    </>
  );
};

import React from 'react';

import { Clob } from './Clob';
import { clobs } from './clobs';
import { Hideout } from '../Icon/Hideout';
import { ReactNode } from 'react';
import { Wheat } from '../Icon/Wheat';
import { Windmill } from '../Icon/Windmill';
import { Forest } from '../Icon/Forest';
import { House } from '../Icon/House';
import { Village } from '../Icon/Village';
import { Castle } from '../Icon/Castle';
import { room } from './rooms';
import { RoomModel } from './RoomModel';
import hideout from './img/hideout.png';

export enum ETowns {
  t1 = 't1',
  t2 = 't2'
}

export interface IRoom {
  id: string;
  objectCount: number;
  description: string;
  specialLoot?: {
    chance: number;
    name: string;
  };
  name: string;
  icon: ReactNode;
  locked: boolean;
  levelRange: number[];
  unlockLocations?: string[];
  unlocksLocation?: number;
  unlockTown?: ETowns;
  clobs: Clob[];
}

export const rooms: IRoom[] = [
  {
    id: 't1-0',
    levelRange: [1, 1],
    objectCount: 1,
    name: 'Соседняя комната',
    description: 'Войдите и разбейте все двери',
    icon: <Hideout width={'48px'} />,
    locked: false,
    unlockLocations: ['t1-1'],
    unlocksLocation: 1,
    clobs: [clobs.woodenDoor]
  },
  {
    id: 't1-1',
    levelRange: [2, 4],
    objectCount: 10,
    name: 'Посевные поля',
    description: '',
    icon: <Wheat width={'48px'} />,
    locked: false,
    unlockLocations: ['t1-2'],
    clobs: [clobs.fearfulWolf, clobs.barrel, clobs.rat]
  },
  {
    id: 't1-2',
    levelRange: [3, 6],
    objectCount: 20,
    name: 'Мельница',
    description: '',
    icon: <Windmill width={'48px'} />,
    locked: true,
    unlockLocations: ['t1-3'],
    clobs: [clobs.wolf, clobs.bear, clobs.barrel, clobs.skeleton]
  },
  {
    id: 't1-3',
    levelRange: [4, 8],
    objectCount: 30,
    name: 'Тёмный лес',
    description: '',
    icon: <Forest width={'48px'} />,
    locked: true,
    unlockTown: ETowns.t2,
    clobs: [clobs.wolf, clobs.bear]
  }
];

export interface ILocation {
  id: number;
  icon: ReactNode;
  level?: number[];
  name: string;
  image?: string;
  rooms: { room: RoomModel; id: number }[];
  quote?: string;
}

export const locations: ILocation[] = [
  {
    id: 0,
    name: 'Убежище',
    image: hideout,
    icon: <House height={'48px'} />,
    rooms: [
      room.hideout,
      room.wheat,
      room.windmill,
      room.darkForest
    ].map((room, id) => ({ room, id })),
    quote: 'Все начинается с выбора...'
  },
  {
    id: 1,
    name: 'Деревня',
    icon: <Village height={'48px'} />,
    rooms: []
    // quote: 'Знать путь и пройти его — не одно и тоже.'
  },
  {
    id: 2,
    name: 'Город',
    icon: <Castle height={'48px'} />,
    rooms: []
  }
];

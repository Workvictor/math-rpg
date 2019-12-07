import { TIcon } from '../Icon/TIcon';
import { Clob } from './Clob';
import { clobs } from './clobs';

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
  icon: TIcon;
  locked: boolean;
  levelRange: number[];
  unlockLocations?: string[];
  unlocksLocation?: number;
  unlockTown?: ETowns;
  clobs: Clob[];
}

class RoomModel {
  constructor(public name: string, public tier: number) {}
  get objectCount() {
    return this.tier * 9 + 3;
  }
  get level() {
    if (this.tier === 0) {
      return [1, 1];
    }
    return [this.tier * 2, this.tier * 4 + 2];
  }
}

export const rooms: IRoom[] = [
  {
    id: 't1-0',
    levelRange: [1, 1],
    objectCount: 1,
    name: 'Соседняя комната',
    description: 'Войдите и разбейте все двери',
    icon: 'hideout',
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
    icon: 'wheat',
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
    icon: 'windmill',
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
    icon: 'forest',
    locked: true,
    unlockTown: ETowns.t2,
    clobs: [clobs.wolf, clobs.bear]
  }
];

export interface ILocation {
  id: number;
  icon: TIcon;
  level: number[];
  name: string;
  roomIds: string[];
}

export const locations: ILocation[] = [
  {
    name: 'Убежище',
    icon: 'house',
    level: [1, 1],
    roomIds: rooms.slice(0, 1).map(({ id }) => id)
  },
  {
    name: 'Деревня',
    icon: 'village',
    level: [2, 10],
    roomIds: rooms.slice(1, 4).map(({ id }) => id)
  },
  {
    name: 'Город',
    icon: 'castle',
    level: [6, 14],
    roomIds: []
  }
].map((i, id) => ({ ...i, id } as ILocation));

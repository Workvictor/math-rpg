import { TIcon } from '../Icon/TIcon';

export enum ETowns {
  t1 = 't1',
  t2 = 't2'
}

export interface IRoom {
  id: string;
  objectCount: number;
  description: string;
  name: string;
  icon: TIcon;
  locked: boolean;
  level: number[];
  unlockLocations?: string[];
  unlockTown?: ETowns;
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
    level: [1, 1],
    objectCount: 3,
    name: 'Соседняя комната',
    description: 'Войдите и разбейте все двери',
    icon: 'hideout',
    locked: false,
    unlockLocations: ['t1-1']
  },
  {
    id: 't1-1',
    level: [2, 6],
    objectCount: 10,
    name: 'Посевные поля',
    description: '',
    icon: 'wheat',
    locked: true,
    unlockLocations: ['t1-2']
  },
  {
    id: 't1-2',
    level: [4, 8],
    objectCount: 20,
    name: 'Мельница',
    description: '',
    icon: 'windmill',
    locked: true,
    unlockLocations: ['t1-3']
  },
  {
    id: 't1-3',
    level: [6, 10],
    objectCount: 30,
    name: 'Тёмный лес',
    description: '',
    icon: 'forest',
    locked: true,
    unlockTown: ETowns.t2
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
    id: 0,
    name: 'Убежище',
    icon: 'house',
    level: [1, 1],
    roomIds: rooms.slice(0, 1).map(({ id }) => id)
  },
  {
    id: 1,
    name: 'Деревня',
    icon: 'village',
    level: [2, 10],
    roomIds: rooms.slice(1, 4).map(({ id }) => id)
  },
  {
    id: 2,
    name: 'Город',
    icon: 'castle',
    level: [6, 14],
    roomIds: []
  }
];

import { TIcon } from '../Icon/TIcon';

export enum ETowns {
  t1 = 't1',
  t2 = 't2'
}

export interface IRoom {
  id: string;
  name: string;
  icon: TIcon;
  locked: boolean;
  level: number[];
  unlockLocations?: string[];
  unlockTown?: ETowns;
}

export interface ILocation {
  id: ETowns;
  name: string;
  roomIds: string[];
}

export const rooms: IRoom[] = [
  {
    id: 't1-0',
    level: [1, 1],
    name: 'Убежище',
    icon: 'wheat',
    locked: false,
    unlockLocations: ['t1-1']
  },
  {
    id: 't1-1',
    level: [1, 4],
    name: 'Посевные поля',
    icon: 'wheat',
    locked: true,
    unlockLocations: ['t1-2']
  },
  {
    id: 't1-2',
    level: [2, 8],
    name: 'Мельница',
    icon: 'windmill',
    locked: true,
    unlockLocations: ['t1-3']
  },
  {
    id: 't1-3',
    level: [3, 9],
    name: 'Тёмный лес',
    icon: 'forest',
    locked: true,
    unlockTown: ETowns.t2
  }
];

export const locations: ILocation[] = [
  {
    name: 'Тренировочный лагерь',
    id: ETowns.t1,
    roomIds: rooms.slice(0, 4).map(({ id }) => id)
  },
  {
    name: 'Деревня',
    id: ETowns.t1,
    roomIds: rooms.slice(0, 4).map(({ id }) => id)
  },
  {
    name: 'Город',
    id: ETowns.t2,
    roomIds: []
  }
];

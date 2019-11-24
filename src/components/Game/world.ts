import { TIcon } from '../icons/TIcon';

export type Towns = 't1' | 't2';

export interface Location {
  id: string;
  name: string;
  icon: TIcon;
  locked: boolean;
  level: number[];
  unlockLocations?: string[];
  unlockTown?: Towns;
}

export interface ITown {
  id: Towns;
  name: string;
  locationIds: string[];
  availableLocations: string[];
}

export const locations: Location[] = [
  {
    id: 't1-0',
    level: [1, 1],
    name: 'Тренировочный лагерь',
    icon: 'wheat',
    locked: true,
    unlockLocations: ['t1-1']
  },
  {
    id: 't1-1',
    level: [1, 4],
    name: 'Посевные поля',
    icon: 'wheat',
    locked: false,
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
    unlockTown: 't2'
  }
];

export const towns: ITown[] = [
  {
    id: 't1',
    name: 'village',
    locationIds: ['t1-1', 't1-2', 't1-3'],
    availableLocations: ['t1-1']
  },
  {
    id: 't2',
    name: 'town',
    locationIds: [],
    availableLocations: []
  }
];

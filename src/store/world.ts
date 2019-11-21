import { TIcon } from '../components/icons/TIcon';

export type Towns = 't1' | 't2';
export type LocationIds = 't1-1' | 't1-2' | 't1-3' | 't2-1';

export interface Location {
  id: LocationIds;
  name: string;
  icon: TIcon;
  locked: boolean;
  level: number[];
  unlockLocations?: LocationIds[];
  unlockTown?: Towns;
}

export interface ICreature {
  id: string;
  name: string;
  hp: number;
  dmg: number;
}

export interface ITown {
  id: Towns;
  name: string;
  locationIds: LocationIds[];
  availableLocations: LocationIds[];
}

export const locations: Location[] = [
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

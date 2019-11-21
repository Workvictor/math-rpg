export type Towns = 't1' | 't2';
export type LocationIds = 't1-1' | 't1-2' | 't1-3' | 't2-1';

export interface Location {
  id: LocationIds;
  name: string;
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
    name: 'crop fields',
    unlockLocations: ['t1-2']
  },
  {
    id: 't1-2',
    level: [2, 8],
    name: 'windmill',
    unlockLocations: ['t1-3']
  },
  {
    id: 't1-3',
    level: [3, 9],
    name: 'dark wood',
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

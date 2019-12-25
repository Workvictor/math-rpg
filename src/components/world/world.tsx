import React from 'react';

import { ReactNode } from 'react';
import { House } from '../Icon/House';
import { Village } from '../Icon/Village';
import { Castle } from '../Icon/Castle';
import hideout from './img/hideout.png';
import { IRoom } from '../Room/createRoom';
import { rooms } from '../Room/rooms';

export interface ILocation {
  id: number;
  icon: ReactNode;
  level?: number[];
  name: string;
  image?: string;
  rooms: IRoom[];
  quote?: string;
}

export const locations: ILocation[] = [
  {
    id: 0,
    name: 'Убежище',
    image: hideout,
    icon: <House height={'48px'} />,
    rooms: [rooms[0], rooms[1], rooms[2], rooms[3]],
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

import React from 'react';

import { RoomModel } from './RoomModel';
import { Hideout } from '../Icon/Hideout';
import { clobs } from './clobs';
import { Wheat } from '../Icon/Wheat';
import { Windmill } from '../Icon/Windmill';
import { Forest } from '../Icon/Forest';

export type TRoomName = 'hideout' | 'wheat' | 'windmill' | 'darkForest';

export const room: { [key in TRoomName]: RoomModel } = {
  hideout: new RoomModel({
    label: 'Сарай',
    name: 'hideout',
    level: 1,
    description: 'Отыщите оружие',
    clobsCount: 10,
    clobsTypes: [clobs.woodenDoor, clobs.barrel, clobs.rat],
    icon: <Hideout height={'48px'} />,
    locationId: 0,
    nextRoom: 'wheat',
    goals: [
      {
        clobType: 'rat',
        count: 10
      }
    ],
    objects: [
      {
        chance: 50,
        clobType: 'barrel'
      },
      {
        chance: 100,
        clobType: 'rat'
      }
    ]
  }),
  wheat: new RoomModel({
    name: 'wheat',
    label: 'Поле',
    description: 'Очистите поле от бешенных животных',
    level: 4,
    clobsCount: 12,
    clobsTypes: [clobs.fearfulWolf, clobs.barrel, clobs.rat],
    icon: <Wheat height={'48px'} />,
    locationId: 0,
    nextLocationId: 1,
    nextRoom: 'windmill',
    goals: [
      {
        clobType: 'fearfulWolf',
        count: 20
      }
    ],
    objects: [
      {
        chance: 0.25,
        clobType: 'barrel'
      },
      {
        chance: 1,
        clobType: 'fearfulWolf'
      },
      {
        chance: 1,
        clobType: 'rat'
      }
    ]
  }),
  windmill: new RoomModel({
    name: 'windmill',
    nextRoom: 'darkForest',
    label: 'Мельница',
    description: 'Помогите жителям вернуть контроль над областью',
    level: 6,
    clobsCount: 28,
    clobsTypes: [clobs.wolf, clobs.bear, clobs.barrel, clobs.skeleton],
    icon: <Windmill height={'48px'} />,
    locationId: 1,
    goals: [],
    objects: []
  }),
  darkForest: new RoomModel({
    name: 'darkForest',
    label: 'Тёмный лес',
    description: 'Только самый смелый путник доберется сюда',
    level: 10,
    clobsCount: 36,
    clobsTypes: [clobs.wolf, clobs.bear, clobs.barrel, clobs.skeleton],
    icon: <Forest height={'48px'} />,
    locationId: 1,
    goals: [],
    objects: []
  })
};
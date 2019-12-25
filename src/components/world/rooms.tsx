import React from 'react';

import { RoomModel } from './RoomModel';
import { clobs } from './clobs';

export type TRoomName = 'hideout' | 'wheat' | 'windmill' | 'darkForest';

export const room: { [key in TRoomName]: RoomModel } = {
  hideout: new RoomModel({
    id: 0,
    label: 'Сарай',
    name: 'hideout',
    level: 1,
    description: 'Отыщите оружие',
    clobsCount: 10,
    clobsTypes: [clobs.barrel, clobs.smallRat],
    icon: 'hideout',
    locationId: 0,
    nextRoom: 1,
    goals: [
      {
        clobType: 'smallRat',
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
        clobType: 'smallRat'
      }
    ],
    bossType: 'rat',
    exclusiveClobs: []
  }),
  wheat: new RoomModel({
    id: 1,
    name: 'wheat',
    label: 'Поле',
    description: 'Очистите поле от бешенных животных',
    level: 4,
    clobsCount: 12,
    clobsTypes: [clobs.fearfulWolf, clobs.barrel, clobs.rat],
    icon: 'wheat',
    locationId: 0,
    nextRoom: 2,
    goals: [
      {
        clobType: 'fearfulWolf',
        count: 20
      }
    ],
    objects: [
      {
        chance: 25,
        clobType: 'barrel'
      },
      {
        chance: 100,
        clobType: 'fearfulWolf'
      },
      {
        chance: 100,
        clobType: 'rat'
      }
    ],
    bossType: 'wolf',
    exclusiveClobs: []
  }),
  windmill: new RoomModel({
    id: 2,
    name: 'windmill',
    nextRoom: 3,
    label: 'Мельница',
    description: 'Помогите жителям вернуть контроль над областью',
    level: 6,
    clobsCount: 28,
    clobsTypes: [clobs.wolf, clobs.bear, clobs.barrel, clobs.skeleton],
    icon: 'windmill',
    locationId: 0,
    goals: [
      {
        clobType: 'wolf',
        count: 38
      }
    ],
    objects: [
      {
        chance: 25,
        clobType: 'barrel'
      },
      {
        chance: 45,
        clobType: 'rat'
      },
      {
        chance: 100,
        clobType: 'wolf'
      },
      {
        chance: 85,
        clobType: 'skeleton'
      }
    ],
    bossType: 'wolf',
    exclusiveClobs: []
  }),
  darkForest: new RoomModel({
    id: 3,
    name: 'darkForest',
    label: 'Тёмный лес',
    description: 'Только самый смелый путник доберется сюда',
    level: 10,
    clobsCount: 46,
    clobsTypes: [clobs.wolf, clobs.bear, clobs.barrel, clobs.skeleton],
    icon: 'forest',
    locationId: 0,
    goals: [
      {
        clobType: 'bear',
        count: 40
      }
    ],
    objects: [
      {
        chance: 15,
        clobType: 'barrel'
      },
      {
        chance: 65,
        clobType: 'rat'
      },
      {
        chance: 100,
        clobType: 'bear'
      },
      {
        chance: 90,
        clobType: 'wolf'
      },
      {
        chance: 75,
        clobType: 'skeleton'
      }
    ],
    bossType: 'bear',
    exclusiveClobs: []
  })
};

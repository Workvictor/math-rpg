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
    clobsTypes: [clobs.woodenDoor, clobs.barrel],
    icon: <Hideout height={'48px'} />,
    locationId: 0,
    nextRoom: 'wheat'
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
    nextRoom: 'windmill'
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
    locationId: 1
  }),
  darkForest: new RoomModel({
    name: 'darkForest',
    label: 'Тёмный лес',
    description: 'Только самый смелый путник доберется сюда',
    level: 10,
    clobsCount: 36,
    clobsTypes: [clobs.wolf, clobs.bear, clobs.barrel, clobs.skeleton],
    icon: <Forest height={'48px'} />,
    locationId: 1
  })
};

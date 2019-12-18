import { ReactNode } from 'react';
import { Clob } from './Clob';
import { TRoomName } from './rooms';
import { TClobType } from './clobs';
import { TIcons } from '../Icon/icons';

interface IRoomObject {
  chance: number;
  clobType: TClobType;
}

interface IRoomGoal {
  clobType: TClobType;
  count: number;
}

interface IConstructor {
  name: string;
  label: string;
  description?: string;
  icon: TIcons;
  clobsTypes: Clob[];
  objects: IRoomObject[];
  goals: IRoomGoal[];
  clobsCount: number;
  locationId: number;
  level: number;
  prevRoom?: TRoomName;
  nextRoom?: TRoomName;
  nextLocationId?: number;
  bossType: TClobType;
  exclusiveClobs: TClobType[];
}

export class RoomModel implements IConstructor {
  level: number = 1;
  name: string;
  label: string;
  description?: string;
  clobsTypes: Clob[];
  bossType: TClobType;
  exclusiveClobs: TClobType[];
  objects: IRoomObject[];
  goals: IRoomGoal[];
  clobsCount: number;
  locationId: number;
  icon: TIcons;
  prevRoom?: TRoomName;
  nextRoom?: TRoomName;
  nextLocationId?: number;

  constructor(props: IConstructor) {
    const {
      name,
      label,
      description,
      icon,
      clobsTypes,
      clobsCount,
      locationId,
      level,
      nextRoom,
      prevRoom,
      nextLocationId,
      objects,
      goals,
      bossType,
      exclusiveClobs
    } = props;
    this.level = level;
    this.objects = objects;
    this.bossType = bossType;
    this.exclusiveClobs = exclusiveClobs;
    this.goals = goals;
    this.label = label;
    this.name = name;
    this.description = description;
    this.icon = icon;
    this.clobsTypes = clobsTypes;
    this.clobsCount = clobsCount;
    this.locationId = locationId;
    this.nextRoom = nextRoom;
    this.prevRoom = prevRoom;
    // TODO change to listName
    this.nextLocationId = nextLocationId;
  }
}

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
  nextRoom?: number;
  nextLocationId?: number;
  bossType: TClobType;
  id: number;
  exclusiveClobs: TClobType[];
}

export class RoomModel implements IConstructor {
  level: number = 1;
  name: string;
  id: number;
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
  nextRoom?: number;
  nextLocationId?: number;

  constructor(props: IConstructor) {
    const {
      name,
      label,
      description,
      icon,
      id,
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
    this.id = id;
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

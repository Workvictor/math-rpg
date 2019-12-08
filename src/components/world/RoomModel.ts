import { ReactNode } from 'react';
import { Clob } from './Clob';
import { TRoomName } from './rooms';

interface IConstructor {
  name: string;
  label: string;
  description?: string;
  icon: ReactNode;
  clobsTypes: Clob[];
  clobsCount: number;
  locationId: number;
  level: number;
  prevRoom?: TRoomName;
  nextRoom?: TRoomName;
  nextLocationId?: number;
}

export class RoomModel implements IConstructor {
  level: number = 1;
  name: string;
  label: string;
  description?: string;
  clobsTypes: Clob[];
  clobsCount: number;
  locationId: number;
  icon: ReactNode;
  prevRoom?: TRoomName;
  nextRoom?: TRoomName;
  nextLocationId?: number;
  prevLocationId?: number;

  constructor(props: IConstructor) {
    const {
      name,
      label,
      description = '',
      icon,
      clobsTypes,
      clobsCount,
      locationId,
      level,
      nextRoom,
      prevRoom,
      nextLocationId
    } = props;
    this.level = level;
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
    this.prevLocationId = this.locationId - 1;
  }
}

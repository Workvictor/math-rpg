import { TIcons } from '../Icon/icons';
import { IMonsterPrefabType } from '../Entity/monsterPrefabs';
import { Mod } from '../Entity/Mod';
import { Pas } from '../Entity/Pas';

let index = 0;

export interface IRoom {
  index: number;
  level: number;
  icon: TIcons;
  label: string;
  description: string;
  bossMods: { mod: Partial<Mod>; pas: Partial<Pas> };
  mobTypes: IMonsterPrefabType[];
  mobCount: number;
}

type IProps = Omit<IRoom, 'index'>;

export const createRoom = (room: IProps): IRoom => {
  return {
    index: index++,
    ...room
  };
};

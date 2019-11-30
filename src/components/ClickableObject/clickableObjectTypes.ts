import { TIcon } from '../Icon/TIcon';

interface IType {
  level: number[];
  name: string;
  damageValue: number;
  healthPointValue: number;
  icon: TIcon;
}

export const clickableObjectTypes: IType[] = [
  {
    level: [1],
    name: 'дверь',
    damageValue: 1.2,
    healthPointValue: 1.2,
    icon: 'woodenDoor'
  },
  {
    level: [2, 3, 4],
    name: 'волк',
    damageValue: 1.2,
    healthPointValue: 1.2,
    icon: 'wolf'
  },
  {
    level: [5, 6, 7, 8, 9, 10],
    name: 'медведь',
    damageValue: 1.5,
    healthPointValue: 1.8,
    icon: 'bear'
  }
];

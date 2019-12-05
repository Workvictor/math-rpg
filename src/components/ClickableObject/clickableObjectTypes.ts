import { TIcon } from '../Icon/TIcon';

interface IClob {
  level: number[];
  name: string;
  icon: TIcon;
  damageValue: number;
  healthPointValue: number;
  staminaDrainValue: number;
  expValue: number;
}

export const clickableObjectTypes: IClob[] = [
  {
    level: [1],
    name: 'дверь',
    icon: 'woodenDoor',
    damageValue: 0,
    healthPointValue: 1.9,
    staminaDrainValue: 1,
    expValue: 1
  },
  {
    level: [2, 4],
    name: 'волк',
    damageValue: 1.2,
    staminaDrainValue: 1,
    healthPointValue: 1.2,
    expValue: 1,
    icon: 'wolf'
  },
  {
    level: [5, 10],
    name: 'медведь',
    damageValue: 1.5,
    staminaDrainValue: 1,
    healthPointValue: 1.8,
    expValue: 1,
    icon: 'bear'
  }
];

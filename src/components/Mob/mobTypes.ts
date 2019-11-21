import { TIcon } from '../icons/TIcon';

interface IMobType {
  level: number[];
  name: string;
  damageValue: number;
  healthPointValue: number;
  icon: TIcon;
}

export const mobTypes: IMobType[] = [
  {
    level: [1, 2, 3],
    name: 'волк',
    damageValue: 1.2,
    healthPointValue: 1.2,
    icon: 'wolf'
  },
  {
    level: [4, 5, 6, 7, 8, 9, 10],
    name: 'медведь',
    damageValue: 1.5,
    healthPointValue: 1.8,
    icon: 'bear'
  }
];

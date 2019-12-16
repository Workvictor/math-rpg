import { Clob } from './Clob';
import { clobPrefix } from './clobPrefix';

export type TClobType =
  | 'woodenDoor'
  | 'barrel'
  | 'wolf'
  | 'fearfulWolf'
  | 'bear'
  | 'rat'
  | 'smallRat'
  | 'skeleton';

export const clobs: { [key in TClobType]: Clob } = {
  woodenDoor: new Clob('запертая дверь', 'woodenDoor').setModifiers({
    damageValue: 0,
    expValue: 0.1,
    healthPointValue: 0.3
  }),

  barrel: new Clob('бочка', 'barrel').setModifiers({
    damageValue: 0,
    expValue: 0.1,
    healthPointValue: 0.3,
    attackTimeoutValue: 0
  }),

  wolf: new Clob('волк', 'wolfHead'),

  fearfulWolf: new Clob('волк', 'wolfHead').setPrefix(clobPrefix.fearful),

  bear: new Clob('медведь', 'bearHead').setModifiers({
    healthPointValue: 1.1,
    damageValue: 1.3
  }),

  smallRat: new Clob('small крыса', 'rat').setModifiers({
    damageValue: 0.25,
    healthPointValue: 0.4,
    attackTimeoutValue: 0.5,
    expValue: 0.35
  }),

  rat: new Clob('крыса', 'rat').setModifiers({
    damageValue: 0.5,
    healthPointValue: 0.8,
    attackTimeoutValue: 0.75,
    expValue: 0.65
  }),

  skeleton: new Clob('скелет', 'skeleton')
};

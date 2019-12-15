import { Clob } from './Clob';
import { clobPrefix } from './clobPrefix';

export type TClobType =
  | 'woodenDoor'
  | 'barrel'
  | 'wolf'
  | 'fearfulWolf'
  | 'bear'
  | 'rat'
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
    healthPointValue: 0.3
  }),

  wolf: new Clob('волк', 'wolfHead'),

  fearfulWolf: new Clob('волк', 'wolfHead').setPrefix(clobPrefix.fearful),

  bear: new Clob('медведь', 'bearHead').setModifiers({
    healthPointValue: 1.1
  }),

  rat: new Clob('крыса', 'rat').setModifiers({
    damageValue: 0.5,
    healthPointValue: 0.8
  }),

  skeleton: new Clob('скелет', 'skeleton')
};

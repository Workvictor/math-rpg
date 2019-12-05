import { Clob } from './Clob';
import { clobPrefix } from './clobPrefix';

export const clobs = {
  woodenDoor: new Clob('дверь', 'woodenDoor').setModifiers({
    damageValue: 0,
    expValue: 0.5
  }),
  wolf: new Clob('волк', 'wolf'),
  fearfulWolf: new Clob('волк', 'wolf').setPrefix(clobPrefix.fearful),
  bear: new Clob('медведь', 'bear'),
  rat: new Clob('крыса', 'rat'),
  skeleton: new Clob('скелет', 'skeleton'),
  barrel: new Clob('бочка', 'barrel')
};

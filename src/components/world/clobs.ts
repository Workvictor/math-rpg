import { Clob } from './Clob';
import { clobPrefix } from './clobPrefix';
import { items } from './items';

export const clobs = {
  woodenDoor: new Clob('запертая дверь', 'woodenDoor')
    .setModifiers({
      damageValue: 0,
      expValue: 0.1
    })
    .setLoot([items.stick], [1]),
  wolf: new Clob('волк', 'wolf'),
  fearfulWolf: new Clob('волк', 'wolf').setPrefix(clobPrefix.fearful),
  bear: new Clob('медведь', 'bear').setModifiers({
    healthPointValue: 1.1
  }),
  rat: new Clob('крыса', 'rat').setModifiers({
    damageValue: 0.5,
    healthPointValue: 0.8
  }),
  skeleton: new Clob('скелет', 'skeleton'),
  barrel: new Clob('бочка', 'barrel').setModifiers({
    damageValue: 0,
    expValue: 0.1
  })
};

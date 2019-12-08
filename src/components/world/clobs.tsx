import React from 'react';

import { Clob } from './Clob';
import { clobPrefix } from './clobPrefix';
import { items } from './items';
import { WoodenDoor } from '../Icon/WoodenDoor';
import { WolfHead } from '../Icon/WolfHead';
import { BearHead } from '../Icon/BearHead';
import { Rat } from '../Icon/Rat';
import { Skeleton } from '../Icon/Skeleton';
import { Barrel } from '../Icon/Barrel';

export const clobs = {
  woodenDoor: new Clob('запертая дверь', (<WoodenDoor />))
    .setModifiers({
      damageValue: 0,
      expValue: 0.1
    })
    .setLoot([items.stick], [1]),

  wolf: new Clob('волк', (<WolfHead />)),

  fearfulWolf: new Clob('волк', (<WolfHead />)).setPrefix(clobPrefix.fearful),

  bear: new Clob('медведь', (<BearHead />)).setModifiers({
    healthPointValue: 1.1
  }),

  rat: new Clob('крыса', (<Rat />)).setModifiers({
    damageValue: 0.5,
    healthPointValue: 0.8
  }),

  skeleton: new Clob('скелет', (<Skeleton />)),

  barrel: new Clob('бочка', (<Barrel />)).setModifiers({
    damageValue: 0,
    expValue: 0.1
  })
};

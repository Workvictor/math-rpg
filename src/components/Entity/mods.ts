import { Entity } from './Entity';

export const mods = {
  swiftyBossMod: {
    mad: new Entity.Mod({
      hp: 1.8,
      asp: 1.2,
      exp: 2,
      gold: 4
    }),
    pas: new Entity.Pas('0-3-0')
  },
  mightyBossMod: {
    mod: new Entity.Mod({
      hp: 2,
      exp: 2,
      gold: 4,
      dmg: 1.4
    }),
    pas: new Entity.Pas('3-0-0')
  },
  rabid: {
    mod: new Entity.Mod({
      hp: 0.8,
      asp: 1.4,
      dmg: 0.8
    })
  },
  fearful: {
    mod: new Entity.Mod({
      hp: 0.7,
      asp: 0.8,
      dmg: 0.7
    })
  },
  richy: {
    mod: new Entity.Mod({
      gold: 2
    })
  }
};

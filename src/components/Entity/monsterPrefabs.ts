import { Entity } from './Entity';

export const monsterPrefabs = {
  skeleton: () =>
    new Entity({
      icon: 'skeleton',
      name: 'Skeleton',
      overrides: {
        mod: new Entity.Mod({
          asp: 1.2
        })
      }
    }),

  rat: () =>
    new Entity({
      name: 'Rat',
      icon: 'rat',
      overrides: {
        mod: new Entity.Mod({
          asp: 0.8,
          hp: 0.8,
          dmg: 0.5
        })
      }
    }),
  bigRat: () =>
    new Entity({
      name: 'Big rat',
      icon: 'rat',
      overrides: {
        pas: new Entity.Pas('3-0-0'),
        mod: new Entity.Mod({
          asp: 0.8,
          hp: 0.8,
          dmg: 0.5
        })
      }
    }),
  wolf: () =>
    new Entity({
      name: 'Wolf',
      icon: 'wolfHead'
    }),
  bear: () =>
    new Entity({
      name: 'Bear',
      icon: 'bearHead'
    }),
  barrel: () =>
    new Entity({
      name: 'Barrel',
      icon: 'barrel',
      overrides: {
        mod: new Entity.Mod({
          dmg: 0,
          exp: 0.25
        })
      }
    }),
  woodenDoor: () =>
    new Entity({
      name: 'Wooden Door',
      icon: 'woodenDoor',
      overrides: {
        mod: new Entity.Mod({
          dmg: 0,
          hp: 3,
          exp: 0.25
        })
      }
    })
};

export type IMonsterPrefabType = keyof typeof monsterPrefabs;

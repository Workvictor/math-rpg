import { createRoom } from './createRoom';
import { mods } from '../Entity/mods';

export const rooms = [
  createRoom({
    level: 1,
    label: 'Small shed',
    description: '',
    icon: 'hideout',
    mobTypes: ['rat'],
    mobCount: 11,
    bossMods: mods.mightyBossMod
  }),
  createRoom({
    level: 4,
    label: 'Wheatfield',
    description: '',
    icon: 'wheat',
    mobTypes: ['rat', 'bigRat', 'skeleton'],
    mobCount: 22,
    bossMods: mods.mightyBossMod
  }),
  createRoom({
    level: 6,
    label: 'Windmill',
    description: '',
    icon: 'windmill',
    mobTypes: ['rat', 'bigRat', 'skeleton', 'wolf'],
    mobCount: 28,
    bossMods: mods.mightyBossMod
  }),
  createRoom({
    level: 10,
    label: 'Dark forest',
    description: '',
    icon: 'forest',
    mobTypes: ['rat', 'bigRat', 'bear', 'wolf', 'skeleton'],
    mobCount: 28,
    bossMods: mods.mightyBossMod
  })
];

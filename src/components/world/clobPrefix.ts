import { ClobModifiers } from './Clob';

export class ClobPrefix {
  constructor(
    public prefixName: string,
    public modifiers: Partial<ClobModifiers>
  ) {}
}

export const clobPrefix = {
  fearful: new ClobPrefix('fearful', {
    damageValue: 0.8,
    healthPointValue: 0.8
  }),
  rabid: new ClobPrefix('rabid', {
    damageValue: 1.2,
    healthPointValue: 0.8,
    attackTimeoutValue: 0.9
  })
};

import { TIcon } from '../Icon/TIcon';
import { ClobPrefix } from './clobPrefix';

export class ClobModifiers {
  damageValue = 1;
  healthPointValue = 1;
  attackTimeoutValue = 1;
  expValue = 1;
}

export class Clob extends ClobModifiers {
  tier?: 1 | 2 | 3;
  loot?: number[];

  label: string;

  private baseDamage = 5;
  private baseHealthPoints = 20;
  private baseAttackTimeout = 1000;
  private baseExpReward = 5;

  level = 1;

  constructor(private name: string, public icon: TIcon) {
    super();
    this.label = name;
  }

  setLevel = (level: number) => {
    this.level = level;
    return this;
  };

  setModifiers = (modifiers: Partial<ClobModifiers>) => {
    const {
      healthPointValue = this.healthPointValue,
      damageValue = this.damageValue,
      attackTimeoutValue = this.attackTimeoutValue,
      expValue = this.expValue
    } = modifiers;
    this.healthPointValue = healthPointValue;
    this.damageValue = damageValue;
    this.attackTimeoutValue = attackTimeoutValue;
    this.expValue = expValue;
    return this;
  };

  setPrefix = (prefix: ClobPrefix) => {
    const {
      prefixName,
      modifiers: {
        healthPointValue = this.healthPointValue,
        damageValue = this.damageValue,
        attackTimeoutValue = this.attackTimeoutValue,
        expValue = this.expValue
      }
    } = prefix;
    this.label = `${prefixName} ${this.name}`;
    this.healthPointValue = healthPointValue;
    this.damageValue = damageValue;
    this.attackTimeoutValue = attackTimeoutValue;
    this.expValue = expValue;
    return this;
  };

  get damage() {
    return Math.floor((this.baseDamage + this.level * 1.1) * this.damageValue);
  }
  get healthPoints() {
    return Math.floor(
      (this.baseHealthPoints + this.level * 3) * this.healthPointValue
    );
  }
  get attackTimeout() {
    return Math.floor(
      (this.baseAttackTimeout - this.level * 5) * this.attackTimeoutValue
    );
  }
  get expReward() {
    return Math.floor(
      (this.baseExpReward + this.healthPoints * 0.25 + this.damage * 0.25) *
        this.expValue
    );
  }
  getExpRewardByLevel = (playerLevel: number) => {
    if (this.level > playerLevel - 2 && this.level <= playerLevel + 6) {
      return this.expReward;
    }
    if (this.level <= playerLevel - 2) {
      return Math.floor(this.expReward * 0.75);
    }
    if (this.level <= playerLevel - 3 && this.level >= playerLevel - 4) {
      return Math.floor(this.expReward * 0.5);
    }
    return Math.floor(this.expReward * 0.2);
  };
}

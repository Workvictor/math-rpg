import { ClobPrefix } from './clobPrefix';
import { IItem } from './items';
import { TIcons } from '../Icon/icons';

export class ClobModifiers {
  damageValue = 1;
  healthPointValue = 1;
  attackTimeoutValue = 1;
  expValue = 1;
  goldAmountValue = 1;
}

export class Clob extends ClobModifiers {
  static counter = 0;
  tier?: 1 | 2 | 3;
  goldAmount = 0;
  loot: IItem[] = [];
  lootChance: number[] = [];

  label: string;

  private baseDamage = 3;
  private baseHealthPoints = 30;
  private baseAttackTimeout = 2000;
  private baseExpReward = 10;
  private baseGoldAmount = 1;

  level = 1;

  constructor(private name: string, public iconType: TIcons) {
    super();
    this.label = name;
  }

  setLevel = (level: number) => {
    this.level = level;
    this.goldAmount = Math.floor(
      (level * 2 + level * this.baseGoldAmount) * this.goldAmountValue
    );
    return this;
  };

  setLoot = (items: IItem[], lootChance: number[]) => {
    this.loot = items;
    this.lootChance = lootChance;
    return this;
  };

  setModifiers = (modifiers: Partial<ClobModifiers>) => {
    const {
      healthPointValue = this.healthPointValue,
      damageValue = this.damageValue,
      attackTimeoutValue = this.attackTimeoutValue,
      expValue = this.expValue,
      goldAmountValue = this.goldAmountValue
    } = modifiers;
    this.healthPointValue = healthPointValue;
    this.damageValue = damageValue;
    this.attackTimeoutValue = attackTimeoutValue;
    this.expValue = expValue;
    this.goldAmountValue = goldAmountValue;
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
      this.baseAttackTimeout *
        (this.baseAttackTimeout /
          (this.baseAttackTimeout * this.attackTimeoutValue))
    );
  }
  get expReward() {
    return Math.floor(
      (this.baseExpReward +
        (this.healthPoints * 0.65) /
          (Math.max(1, this.level - 1) / this.level) +
        this.damage * 0.65) *
        ((this.expValue +
          this.damageValue +
          this.healthPointValue +
          this.attackTimeoutValue) /
          4)
    );
  }
}

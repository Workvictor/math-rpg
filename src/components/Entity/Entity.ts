import { TIcons } from '../Icon/icons';
import { Pas } from './Pas';
import { Mod } from './Mod';
import { Base } from './Base';
import { getSum } from '../utils/getSum';
import { spreadRange } from '../utils/spreadRange';

interface State {
  level: number;
  physique: number;
  agility: number;
  spirit: number;
  base: Base;
  mod: Mod;
  pas: Pas;
}

const statsPerLvl = 3;

export class Entity {
  static Mod = Mod;
  static Pas = Pas;
  static Base = Base;
  static instanceCounter = 0;

  public name: string;
  public instanceId: number;
  public icon: TIcons;

  protected damageTaken: number[] = [];

  protected bonus = {
    hp: {
      flat: 0,
      percent: 0
    }
  };

  protected state: State = {
    level: 1,
    physique: statsPerLvl,
    agility: statsPerLvl,
    spirit: statsPerLvl,
    base: new Base(),
    mod: new Mod(),
    pas: new Pas()
  };

  constructor(props: {
    name: string;
    icon: TIcons;
    overrides?: Partial<State>;
  }) {
    Entity.instanceCounter = Entity.instanceCounter + 1;
    if (props.overrides) {
      Object.assign(this.state, props.overrides);
    }
    this.name = props.name;
    this.icon = props.icon;
    this.instanceId = Entity.instanceCounter;
  }

  takeDamage(val: number) {
    this.damageTaken.push(val);
  }

  get damageTakenAll() {
    return getSum(this.damageTaken);
  }

  get goldAmount() {
    return Math.max(1, spreadRange(this.hpMax * 0.25 * this.mod.gold));
  }

  set mod(mod: Mod) {
    Object.assign(this.state.mod, mod);
  }

  get mod() {
    return this.state.mod;
  }

  set level(val: number) {
    this.state.level += val;
  }

  get level() {
    return this.state.level;
  }

  set physique(val: number) {
    this.state.physique += val;
  }

  get physique() {
    return this.state.physique + this.level * this.state.pas.num[0];
  }

  set agility(val: number) {
    this.state.agility += val;
  }

  get agility() {
    return this.state.agility + this.level * this.state.pas.num[1];
  }

  set spirit(val: number) {
    this.state.spirit += val;
  }

  get spirit() {
    return this.state.spirit + this.level * this.state.pas.num[2];
  }

  levelUp() {
    this.state.level++;
  }

  get attackDelay() {
    return Math.max(
      this.state.base.aspMax,
      Math.floor(this.state.base.asp - this.agility * 25 * this.state.mod.asp)
    );
  }

  get critChance() {
    return Math.floor(this.agility * 0.1 * 100) / 100;
  }

  get healthPoints() {
    return this.hpMax - getSum(this.damageTaken);
  }

  get isDead() {
    return this.hpMax <= getSum(this.damageTaken);
  }

  get isBoss() {
    return this.mod.tier === 3;
  }

  get isChampion() {
    return this.mod.tier === 2;
  }

  get hpMax() {
    const flat =
      this.state.base.hp +
      this.level * 12 +
      this.state.physique * 8 +
      this.bonus.hp.flat;
    return flat * (1 + this.bonus.hp.percent);
  }

  get damage() {
    return Math.floor(this.physique * 0.25 + this.agility * 0.1);
  }

  get experience() {
    return Math.floor(this.state.base.exp * this.level * this.state.mod.tier);
  }
}

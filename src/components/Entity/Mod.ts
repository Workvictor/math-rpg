export class Mod {
  public hp = 1;
  public dmg = 1;
  public asp = 1;
  public exp = 1;
  public gold = 1;
  constructor(props?: Partial<Mod>) {
    if (props) {
      Object.assign(this, props);
    }
  }
  get tier() {
    const tier = [3, 2, 0];
    const list = [this.hp, this.asp, this.dmg, this.exp, this.gold];
    const mid = list.reduce((a, c) => a + c, 0) / list.length;
    return tier.filter(i => i <= mid).length;
  }
}

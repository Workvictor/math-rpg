export class Base {
  public dmg = 2;
  public hp = 30;
  public mp = 30;
  public stam = 30;
  public exp = 5;
  public asp = 2000;
  public aspMax = 1250;
  constructor(props?: Partial<Base>) {
    if (props) {
      Object.assign(this, props);
    }
  }
}

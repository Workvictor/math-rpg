export class Player {
  constructor(public name: string) {}
  public level: number = 1;
  public maxLevel: number = 99;
  public expTable: number[] = new Array(this.maxLevel)
    .fill(1)
    .map((i, index) => i + index);
}

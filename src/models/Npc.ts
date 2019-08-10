export class Npc {
  public name: string;
  public type: string;
  public level: number;
  public healthPoints: number;
  public healthPointsMax: number;
  public damage: number;
  public target: string = "";
  constructor(name: string, type: "humanoid" | "beast", level: number) {
    this.name = name;
    this.type = type;
    this.level = level;
    this.healthPointsMax = this.level * 10;
    this.healthPoints = this.healthPointsMax;
    this.damage = this.level;
  }
  setTarget = (targetName: string) => {
    this.target = targetName;
  };
  receiveDamage = (damage: number) => {
    this.healthPoints -= damage;
  };
  attack = () => {
    if (this.target) {
      console.log(
        `${this.name} attacks ${this.target} and add ${this.damage} damage`
      );
    }
    if (!this.target) {
      console.log("no target");
    }
  };
}

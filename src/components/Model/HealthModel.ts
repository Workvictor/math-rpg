export class HealthModel {
  baseHealthPoints = 32;
  healthPoints = this.healthPointsMax;

  constructor(
    private level: number,
    private strength: number,
    private flatBonus: number,
    private percentBonus: number
  ) {}

  get flatHealthPoints() {
    return (
      this.baseHealthPoints +
      this.level * 12 +
      this.strength / 2 +
      this.flatBonus
    );
  }

  get healthPointsMax() {
    return this.flatHealthPoints * (1 + this.percentBonus);
  }
}

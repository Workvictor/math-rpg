import { towns } from './world';

export class PlayerModel {
  public lastUpdate: number;
  public level: number;
  public questbook: string[];
  public location: string;

  public healthPoints: number = 100;
  public healthPointsMax: number = 100;
  public healthPointsPerSecond: number = 1;
  public skillPoints: number = 0;
  public healValue: number = 25;
  public exp: number = 1;
  public expMax: number = 100;
  public damage: number = 6;
  public clickCount: number = 0;
  public attackDelay: number = 1000;
  public targetId: number | null = null;
  public nextAttackTime: number = Date.now();

  constructor(public name: string) {
    this.lastUpdate = Date.now();
    this.level = 1;
    this.questbook = [];
    this.location = towns[0].id;
  }
}

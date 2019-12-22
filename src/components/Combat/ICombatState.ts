export interface ICombatState {
  outOfCombat: boolean;
  nextHealTime: number;
  nextAttackTime: number;
  targetId: number | null;
  nextRestTime: number;
}

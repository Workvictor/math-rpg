interface SetTarget {
  type: 'SetTarget';
  targetId: number | null;
}
interface SetNextHealTime {
  type: 'SetNextHealTime';
  nextHealTime: number;
}
interface SetNextRestTime {
  type: 'SetNextRestTime';
  nextRestTime: number;
}
interface SetNextAttackTime {
  type: 'SetNextAttackTime';
  nextAttackTime: number;
}
interface VisitAreaRestore {
  type: 'VisitAreaRestore';
}
interface LeaveAreaRestore {
  type: 'LeaveAreaRestore';
}

export type Actions =
  | SetTarget
  | SetNextAttackTime
  | SetNextRestTime
  | SetNextHealTime
  | VisitAreaRestore
  | LeaveAreaRestore;

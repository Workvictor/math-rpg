interface MonsterModifiers {
  dmg: number;
  hp: number;
  asp: number;
  exp: number;
  gold: number;
}

const defaultModifiers: MonsterModifiers = {
  dmg: 1,
  hp: 1,
  asp: 1,
  exp: 1,
  gold: 1
};

export const createMonsterModifiers = (
  modifiers: Partial<MonsterModifiers>
): MonsterModifiers => {
  return {
    ...defaultModifiers,
    ...modifiers
  };
};

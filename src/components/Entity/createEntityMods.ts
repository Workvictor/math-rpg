export interface IEntityModifiers {
  dmg: number;
  hp: number;
  asp: number;
  exp: number;
  gold: number;
  pas:
    | '0-0-3'
    | '0-1-2'
    | '0-2-1'
    | '0-3-0'
    | '1-2-0'
    | '2-1-0'
    | '3-0-0'
    | '2-0-1'
    | '1-0-2'
    | '1-1-1'; // physique-agility-spirit
}

export const createEntityMods = (
  mods: Partial<IEntityModifiers>
): IEntityModifiers => {
  return {
    asp: 1,
    dmg: 1,
    exp: 1,
    gold: 1,
    hp: 1,
    pas: '1-1-1',
    ...mods
  };
};

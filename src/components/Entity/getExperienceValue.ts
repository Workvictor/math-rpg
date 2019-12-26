import { IEntityBase } from './createEntityBase';

export const getExperienceValue = (state: IEntityBase) => {
  return Math.floor(
    state.baseExp *
      Object.entries(state.mods)
        .filter(i => i[0] !== 'pas')
        .reduce((acc, cur) => acc + cur[1], 1)
  );
};

import { IPlayerBase } from './IPlayerBase';
import { getExperienceForNextLevel } from './getExperienceNextForLevel';
import { skillPointsPerLevel, statPointsPerLevel } from './createPlayer';
import { getExperienceByLevelDelta } from './getExperienceByLevelDelta';

export const addExp = (
  state: IPlayerBase,
  expBase: number,
  targetLevel: number
): IPlayerBase => {
  const experience =
    state.experience +
    getExperienceByLevelDelta(expBase, state.level - targetLevel);
  if (experience >= state.experienceNext) {
    // levelUp
    const overCupExp = experience - state.experienceNext;
    const level = state.level + 1;
    return {
      ...state,
      experience: overCupExp,
      level,
      experienceNext: getExperienceForNextLevel(level, state.experienceCache),
      experienceCache: state.experienceCache
        .slice(-1)
        .concat(state.experienceNext),
      skillPoints: state.skillPoints + skillPointsPerLevel,
      statPoints: state.statPoints + statPointsPerLevel
    };
  }
  return {
    ...state,
    experience
  };
};

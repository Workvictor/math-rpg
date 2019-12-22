import { getSum } from '../../utils/getSum';

export const experienceProgressionRate = [25, 60];
const multiplier = 1;

export const getExperienceForNextLevel = (
  nextLevel: number,
  playerCacheExperience?: number[]
) => {
  if (nextLevel <= 2) {
    return experienceProgressionRate[Math.max(0, nextLevel - 1)];
  }

  // if (!playerCacheExperience || playerCacheExperience.length < 2) {
  for (let i = 2; i < nextLevel; i++) {
    experienceProgressionRate.push(
      (experienceProgressionRate[i - 2] + experienceProgressionRate[i - 1]) *
        multiplier
    );
  }
  return Math.floor(experienceProgressionRate[Math.max(0, nextLevel - 1)]);
  // }

  // return Math.floor(getSum(playerCacheExperience) * multiplier);
};

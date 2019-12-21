import { getSum } from '../../utils/getSum';

const initial = [25, 60];
const multiplier = 1.5;

export const getExperienceForNextLevel = (
  nextLevel: number,
  playerCacheExperience?: number[]
) => {
  if (nextLevel <= 2) {
    return initial[Math.max(0, nextLevel - 1)];
  }

  if (!playerCacheExperience || playerCacheExperience.length < 2) {
    for (let i = 2; i < nextLevel; i++) {
      initial.push((initial[i - 2] + initial[i - 1]) * multiplier);
    }
    return Math.floor(initial[Math.max(0, nextLevel - 1)]);
  }

  return Math.floor(getSum(playerCacheExperience) * multiplier);
};

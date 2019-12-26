export const getExperienceForNextLevel = (level: number) => {
  return Math.floor(
    (Math.pow(level * level * level, 1.16) * 32 + level * level * 300) * 0.1 +
      36
  );
};

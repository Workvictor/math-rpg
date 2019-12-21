const baseMatrix = [
  [6, 0.25],
  [4, 0.5],
  [2, 0.75],
  [0, 1]
];

export const getExperienceByLevelDelta = (
  expBase: number,
  levelDelta: number
) => {
  return Math.floor(
    expBase *
      baseMatrix.filter(i => i[0] <= Math.abs(levelDelta)).map(i => i[1])[0]
  );
};

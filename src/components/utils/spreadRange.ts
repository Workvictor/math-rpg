import { randomValueFromRange } from './randomValueFromRange';

export const spreadRange = (
  initialValue: number,
  spreadValue: number = 0.25
) => {
  const spread = initialValue * spreadValue;
  return randomValueFromRange([initialValue - spread, initialValue + spread]);
};

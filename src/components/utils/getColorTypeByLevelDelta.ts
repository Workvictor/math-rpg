import { EColorType } from '../layout/TextColor';

export const getColorTypeByLevelDelta = (levelDelta: number): EColorType => {
  if (levelDelta >= 3) {
    return EColorType.grey;
  }
  if (levelDelta < -2) {
    return EColorType.darkred;
  }
  if (levelDelta >= -2 && levelDelta < 3) {
    return EColorType.goldenrod;
  }
  return EColorType.green;
};

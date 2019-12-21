import { IPlayerBase } from './IPlayerBase';
import { createPlayer } from './createPlayer';

export const restorePlayer = (player: IPlayerBase): IPlayerBase => {
  return createPlayer(player.name, player.level, player.experience);
};

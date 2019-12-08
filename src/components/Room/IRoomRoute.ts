import { ILocationRoute } from '../Location/ILocationRoute';
import { TRoomName } from '../world/rooms';

export interface IRoomRoute extends ILocationRoute {
  roomName: TRoomName;
}

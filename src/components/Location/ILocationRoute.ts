import { IGameRoute } from '../Game/IGameRoute';

export interface ILocationRoute extends IGameRoute {
  locationId: string;
}

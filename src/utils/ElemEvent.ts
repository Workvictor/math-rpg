import React from 'react';
import { Vector } from './Vector';

type TEvent = React.MouseEvent<HTMLDivElement, MouseEvent>;

export class ElemEvent {
  static mouseEvent(handler: (e: TEvent) => void) {
    return handler;
  }

  static touchEvent(handler: (e: React.TouchEvent<HTMLDivElement>) => void) {
    return handler;
  }

  static mouseClientVector({ clientX, clientY }: TEvent) {
    return new Vector(clientX, clientY);
  }
}

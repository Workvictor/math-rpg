import { Border } from './Border';
import { FullWidth } from './FullWidth';
import { Rythm } from './Rythm';
import { Padbox } from './Padbox';

export const UIBlockInner = Padbox.withComponent(FullWidth)
  .withComponent(Rythm)
  .withComponent(Border);

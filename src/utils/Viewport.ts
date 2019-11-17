import { Vector } from './Vector';

export class Viewport {
  public width: number = 0;
  public height: number = 0;
  public x: number = 0;
  public y: number = 0;
  constructor(rect?: ClientRect) {
    if (rect) {
      const { left, top, width, height } = rect;
      this.width = width;
      this.height = height;
      this.x = left;
      this.y = top;
    }
  }
  get from() {
    return new Vector(this.x, this.y);
  }
  get to() {
    return new Vector(this.width, this.height);
  }
  scrollX = (width: number) => this.width - width;
  scrollY = (height: number) => this.height - height;
}

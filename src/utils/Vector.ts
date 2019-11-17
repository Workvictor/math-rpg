export class Vector {
  private _y: number = 0;

  private _x: number = 0;

  static zero() {
    return new Vector();
  }

  constructor(x: number | { x: number; y: number } = 0, y = 0) {
    if (typeof x === 'number') {
      this._x = x;
      this._y = y;
    }
    if (typeof x === 'object') {
      this._x = x.x;
      this._y = x.y;
    }
  }

  get x() {
    return this._x;
  }

  get y() {
    return this._y;
  }

  public add = ({ x, y }: Vector) => new Vector(this._x + x, this._y + y);

  public subtract = ({ x, y }: Vector) => new Vector(this._x - x, this._y - y);

  get coords() {
    return {
      x: this._x,
      y: this._y
    };
  }
}

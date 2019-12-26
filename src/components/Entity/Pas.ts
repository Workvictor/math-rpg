export class Pas {
  constructor(
    public rule:
      | '0-0-3'
      | '0-1-2'
      | '0-2-1'
      | '0-3-0'
      | '1-2-0'
      | '2-1-0'
      | '3-0-0'
      | '2-0-1'
      | '1-0-2'
      | '1-1-1' = '1-1-1'
  ) {}

  get num() {
    return this.rule.split('-').map(Number);
  }
}

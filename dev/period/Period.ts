export default class Period {
  private _from: Date;

  private _to: Date;

  constructor(from: Date, to: Date) {
    this._from = new Date(from);
    this._to = new Date(to);
  }
}

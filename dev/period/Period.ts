import Duration from "../duration/Duration";
import IPeriod, { PeriodDTO } from "./interfaces/IPeriod";

export default class Period extends IPeriod implements PeriodDTO {

  public get start(): Date {
    return new Date(this._start);
  }

  public get end(): Date {
    return new Date(this._end);
  }

  public get duration(): Duration {
    return new Duration(this._end.getTime() - this._start.getTime());
  }
}

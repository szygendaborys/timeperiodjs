import { PeriodComparisonStatuses } from "../PeriodConstants";
import { PeriodDTO } from "./IPeriod";

export default interface IPeriodComparison extends Pick<PeriodDTO, 'start' | 'end'> {
    status: PeriodComparisonStatuses;
}
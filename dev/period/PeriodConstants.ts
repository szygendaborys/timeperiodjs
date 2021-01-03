export enum SortingMethods {
    SORT_ASCENDING = 'sortAscending',
    SORT_DESCENDING = 'sortDescending'
}

export enum PeriodDateTypes {
    START = 'start',
    END = 'end'
}

export enum PeriodComparisonStatuses {
    REMOVED = -1,
    EXACT = 0,
    ADDED = 1
}

export default {
    SortingMethods,
    PeriodDateTypes,
    PeriodComparisonStatuses
}
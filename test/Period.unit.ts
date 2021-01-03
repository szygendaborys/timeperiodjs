import "mocha";
import { expect } from 'chai';
import Period from "../dev/period/Period";
import Duration from "../dev/duration/Duration";
import PeriodDateSorter from "../dev/period/sorters/PeriodDateSorter";
import { IPeriodOverlappingConf } from "../dev/period/interfaces/IPeriod";
import { PeriodComparisonStatuses } from "../dev/period/PeriodConstants";

describe("Period unit tests", () => {

    const now = new Date();
    const hourAfter = new Date(now); hourAfter.setHours(hourAfter.getHours() + 1);

    it("should create a period instance", () => {
        const period = new Period(new Date(), new Date());
        expect(period).to.be.instanceOf(Period);
    });

    it('', () => {
        const period = new Period(new Date('asd'), new Date());
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        expect(period.start.getTime()).to.be.NaN;
    })

    describe("Internal duration tests", () => {

        it("the duration should be 0", () => {
            const period = new Period(new Date(), new Date());
            expect(period.duration).to.be.instanceOf(Duration);
            expect(period.duration.inMilliseconds).to.equal(0);
        });

        it("the period should be larger than 0 and should be equal to 3600000", () => {
            const period = new Period(now, hourAfter);
            expect(period.duration.inMilliseconds).to.be.equal(1000 * 3600);
        })

    })

    describe("Period fitering methods", () => {

        it("should return two dates", () => {
            const period = new Period(new Date(2020, 1, 1), new Date(2020, 11, 31));
            const datesToFilter = [
                new Date(2021, 1, 1),
                new Date('asd'),
                new Date(2020, 2, 2),
                new Date(2023, 4, 1),
                new Date(2020, 1, 1)
            ];

            expect(period.getOverlappingDates(datesToFilter)).to.be.length(2);
        })

        it("should filter the period list correctly", () => {
            const period = new Period(new Date(2020, 1, 1), new Date(2020, 1, 3));
            const overlappingPeriods = period.getOverlappingPeriods(require('./mock/periods.mock').default);

            expect(overlappingPeriods).to.be.length(3);
        })

        it("should not filter the period list correctly", () => {
            const period = new Period(new Date(2020, 1, 1), new Date('asd'));
            const overlappingPeriods = period.getOverlappingPeriods(require('./mock/periods.mock').default);

            expect(overlappingPeriods).to.be.length(0);
        })

        it('should filter periods properly (full overlap only conf)', () => {
            const conf: IPeriodOverlappingConf = {
                onlyFullOverlaps: true
            };

            const period1 = new Period(new Date(2020, 1, 1), new Date(2020, 11, 1));
            const period2 = new Period(new Date(2020, 2, 1), new Date(2020, 4, 3));
            const period3 = new Period(new Date(2021, 1, 1), new Date(2022, 1, 3));

            const result = period1.getOverlappingPeriods([period2, period3], conf);

            expect(result).to.be.length(1);
            expect(result[0].start.getTime()).to.equal(period2.start.getTime());
        });
    })

    describe("Period sorting methods", () => {

        it("should sort ascending by the start date", () => {
            const sorter = new PeriodDateSorter(require('./mock/periods.mock').default);

            expect(sorter.sort()).to.be.length(require('./mock/periods.mock').default.length);
            expect(sorter.periods).to.not.be.equal(sorter.sort());
            expect(sorter.periods[0].start.getDate()).to.be.equal(1);

            let lastEl = sorter.periods[0].start;
            sorter.periods.forEach(period => {
                expect(period.start.getTime()).to.be.gte(lastEl.getTime());
                lastEl = period.start;
            });
        })

        it("should sort descending by the start date", () => {
            const sorter = new PeriodDateSorter(require('./mock/periods.mock').default);

            expect(sorter.sort(true)).to.be.length(require('./mock/periods.mock').default.length);
            expect(sorter.periods).to.not.be.equal(sorter.sort(true));

            let lastEl = sorter.periods[0].start;
            sorter.periods.forEach(period => {
                expect(period.start.getTime()).to.be.lte(lastEl.getTime());
                lastEl = period.start;
            });
        })

        it("should sort ascending by the end date", () => {
            const sorter = new PeriodDateSorter(require('./mock/periods.mock').default);

            expect(sorter.sort(false, true)).to.be.length(require('./mock/periods.mock').default.length);
            expect(sorter.periods).to.not.be.equal(sorter.sort(false, true));

            let lastEl = sorter.periods[0].start;
            sorter.periods.forEach(period => {
                expect(period.end.getTime()).to.be.gte(lastEl.getTime());
                lastEl = period.end;
            });
        })

        it("should sort descending by the end date", () => {
            const sorter = new PeriodDateSorter(require('./mock/periods.mock').default);

            expect(sorter.sort(true, true)).to.be.length(require('./mock/periods.mock').default.length);
            expect(sorter.periods).to.not.be.equal(sorter.sort(true, true));

            let lastEl = sorter.periods[0].end;
            sorter.periods.forEach(period => {
                expect(period.end.getTime()).to.be.lte(lastEl.getTime());
                lastEl = period.end;
            });
        })
    })

    describe("Period comparison methods", () => {

        it("should return an array of 3 single comparison types", () => {
            const period1 = new Period(new Date(2020, 1, 1), new Date(2020, 5, 1));
            const period2 = new Period(new Date(2020, 2, 1), new Date(2021, 1, 1));

            const comparisonResult = period1.comparePeriod(period2)

            expect(comparisonResult).to.be.length(3);
            expect(comparisonResult[0]).to.have.property('status', PeriodComparisonStatuses.REMOVED);
            expect(comparisonResult[1]).to.have.property('status', PeriodComparisonStatuses.EXACT);
            expect(comparisonResult[2]).to.have.property('status', PeriodComparisonStatuses.ADDED);

        });

        it("should return an array of 1 single comparison type", () => {
            const period1 = new Period(new Date(2020, 1, 1), new Date(2020, 5, 1));
            const period2 = new Period(new Date(2020, 1, 1), new Date(2020, 5, 1));

            const comparisonResult = period1.comparePeriod(period2)

            expect(comparisonResult).to.be.length(1);
            expect(comparisonResult[0].start.getTime()).to.equal(new Date(2020, 1, 1).getTime());
            expect(comparisonResult[0].end.getTime()).to.equal(new Date(2020, 5, 1).getTime());

        });

    })
});

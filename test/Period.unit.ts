import "mocha";
import { expect } from 'chai';
import Period from "../dev/period/Period";
import Duration from "../dev/duration/Duration";
import PeriodDateSorter from "../dev/period/sorters/PeriodDateSorter";

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

            console.log(overlappingPeriods);

        })

        it("should not filter the period list correctly", () => {
            const period = new Period(new Date(2020, 1, 1), new Date('asd'));
            const overlappingPeriods = period.getOverlappingPeriods(require('./mock/periods.mock').default);

            expect(overlappingPeriods).to.be.length(0);

        })
    })

    describe("Period sorting methods", () => {

        it("should sort ascending by the start date", () => {
            const sorter = new PeriodDateSorter(require('./mock/periods.mock').default);

            expect(sorter.sort()).to.be.length(require('./mock/periods.mock').default.length);
            expect(sorter.periods).to.be.equal(sorter.sort());
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
            expect(sorter.periods).to.be.equal(sorter.sort(true));

            let lastEl = sorter.periods[0].start;
            sorter.periods.forEach(period => {
                expect(period.start.getTime()).to.be.lte(lastEl.getTime());
                lastEl = period.start;
            });
        })

        it("should sort ascending by the end date", () => {
            const sorter = new PeriodDateSorter(require('./mock/periods.mock').default);

            expect(sorter.sort(false, true)).to.be.length(require('./mock/periods.mock').default.length);
            expect(sorter.periods).to.be.equal(sorter.sort(false, true));

            let lastEl = sorter.periods[0].start;
            sorter.periods.forEach(period => {
                expect(period.end.getTime()).to.be.gte(lastEl.getTime());
                lastEl = period.end;
            });
        })

        it("should sort descending by the end date", () => {
            const sorter = new PeriodDateSorter(require('./mock/periods.mock').default);

            expect(sorter.sort(true, true)).to.be.length(require('./mock/periods.mock').default.length);
            expect(sorter.periods).to.be.equal(sorter.sort(true, true));

            let lastEl = sorter.periods[0].end;
            sorter.periods.forEach(period => {
                expect(period.end.getTime()).to.be.lte(lastEl.getTime());
                lastEl = period.end;
            });
        })
    })
});

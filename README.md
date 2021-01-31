
<h1 align="center"> Timeperiod.js </h1>

<p align="center"> The package, that helps to organize time ranges. </p>

<hr/>

<p> A common problem when working with periods (from - to) was always to sort, filter and manage these times properly and efficiently. This package is trying to solve (almost) every problem, when it comes to working with multiple periods of time. 
The basic usage is presented below. </p>

<h3> List of features </h3>

<ul>
  <li>Manage (extend or shorten) time ranges using only one method!</li>
  <li>Sort an array of periods based on its duration, or on start/end of these periods.</li>
  <li>Filter out unwanted  periods based on the specific time range!</li>
  <li>Get the duration of the period (in milliseconds, seconds, minutes, etc...)</li>
  <li>Compare two periods to each other!</li>
</ul>

<h3> Code Demo </h3>

```html

We will use markdown for the Syntax Highlighting

// Time periods
const period1 = new Period(new Date(2021, 0, 1),new Date(2021, 11, 31));
const period2 = new Period(new Date(), new Date()); // assuming today is 31.01.2021

// Duration
const duration1 = period1.duration.inMilliseconds; // 0
const duration2 = period2.duration.inHours; // 8760

// Changing
period1.change.extendPeriod(20, 'days'); // extends end by 20 days
period1.change.shortenPeriod(15, 'hours', true); // shortens start by 15 hours
period2.change.shortenPeriod(15 * 60 * 1000); // shortens end by 15 minutes

// Sorting
const timePeriods = [period1, period2];
const sorter = new PeriodDateSorter(timePeriods);

sorter.sort(); // sorts ascending by start date, returns an array of periods
sorter.periods; // another way to return these periods from the sorter instance
sorter.sort(true); // sorts descending by start date, returns an array of periods
sorter.sort(false, true); // sorts ascending by end date, returns an array of periods

// Filtering
const period3 = new Period(new Date(2021, 5, 2), new Date(2021, 5, 10));
const period4 = new Period(new Date(2020, 0, 1), new Date(2020, 6, 1));

const timePeriods2 = [period2, period3, period4];
const filter = new PeriodFilter(period1);

period1.getOverlappingPeriods(timePeriods); // returns 2 periods, filtered out period4 

filter.filterPeriods(timePeriods2); // same as .getOverlappingPeriods;
const conf = {
	onlyFullyCovered: true
};
filter.filterPeriods(timePEriods2, conf); // returns periods that are withing the boundary of period1
```

<h3> Docs </h3>

# <h3> Period </h3>

Creates a new period instance. 

`const period = new Period(new Date(), new Date());`

* <b> period.start: Date / period.end: Date </b>
	Returns start/end date of the period
* <b> period.duration: Duration</b>
	Returns duration instance of this period (see `Duration`)
* <b> period.change: PeriodTimeChanger </b>
	See: `PeriodTimeChanger`
* <b> period.getDates(): [Date, Date] </b>
	Returns an array of both dates of the period `[start, end]`
* <b> period.getOverlappingDates(dates: Date[]) </b>
	Takes an array of dates and filters out one if is no within time boundary of the period
* <b> period.isDateOverlapping(date: Date): boolean </b>
* <b> period.isPeriodOverlapping(period: Period, conf?: IPeriodOverlappingConf): boolean </b>
		Takes another period and compares if it overlaps on the main period instance (can partially overlap). If an argument `onlyFullOverlaps` is passed to the configuration as the second parameter, it will only return true if the parent period fully overlaps the checking period.
	```
	IPeriodOverlappingConf {
		onlyFullOverlaps?: boolean
	}
	```
* <b> period.getOverlappingPeriods(periods: Period[], conf?: IPeriodOverlappingConf): Period[] </b>
	Takes an array of periods and returns only overlapping. Configuration means the same as in `isPeriodOverlapping` method.
* <b> period.cutBoundaries(periods: Period[]): Period[] </b>
	Takes an array of periods and filters them out (if they are not at least partially overlapping). If period start or end date reaches out of the main period boundary (but overlaps basing on the second date), it is being shortened up to the boundary of the main period instance.
	i.e.
	```
	Main Period - 01.01.2021 - 31.01.2021
	One of passed periods - 01.01.2020 - 05.05.2021

	Main Period.cutBoundaries([One of passed periods]) will return an array with one period:
	01.01.2021 - 05.05.2021 // the start date was shortened to the start of the main period 
	```
* <b>period.comparePeriod(period: Period): IPeriodComparison[] </b>

```
	IPeriodComparison {
		start: Date,
		end: Date,
		status: -1 | 0 | 1
	}
```

	This method compares two periods. It splits two periods into an array of possibly the shortest ranges of time and checks if the range is included in the first, second or both of periods.
	i.e. 
	```
	First Period - 01.02.2021 - 20.02.2021
	Second Period - 10.02.2021 - 30.03.2021

	Comparing first to the second period will return an array of 3 entries
	1) 
	{
		start: 01.02.2021
		end: 09.02.2021
		status: -1 // was in the first period, but is not in the second 'REMOVED'
	},
	2)
	{
		start: 10.02.2021
		end 20.02.2021
		status: 0 // included in both periods
	},
	3)
	{
		start: 21.02.2021
		end: 30.03.2021
		status: 1 // included in the second period but not in the first one 'ADDED'
	}
	``` 
# <h3> PeriodTimeChanger </h3>

Creates an instance for the Period instance, which helps in extending, shortening the  particular period.

`const change = new PeriodTimeChanger(from: Date, to: Date)`

* <b> change.shortenPeriod(value: number, type?: TimeType, changeStartTime?: boolean): void </b>
shortens the time of the particular period by the units of `value` and type of the time passed in the second argument. If no time type is passed, it will take a milliseconds as a default type. 

```
TimeType: 'milliseconds' | 'seconds' | 'minutes' | 'hours' | 'days'
```

* <b> change.extendPeriod(value: number, type?: TimeType, changeStartTime?: boolean): void  </b>

# <h3> Duration </h3>

Creates a duration instance.

`const duration = new Duration(durationInMilliseconds: number)`

* <b> inMilliseconds </b>
* <b> inSeconds </b>
* <b> inMinutes </b>
* <b> inHours </b>
* <b> STATIC INSTANCE Duration.getDurationBetween(from: Date, to: Date): Duration </b> 
Returns an instance of the Duration class. Make a note this is a STATIC method, not INSTANCE method.
# <h3> DateSorter </h3>

Creates a DateSorter instance, which allows to sort the dates in ascending or in descending order.

`const sorter = new DateSorter(dates: Date[])`

* <b> sorter.sort(descending?: boolean): Date[] </b>
	Sorts and returns dates in ascending (or descending if the first argument was set to true) order.

# <h3> PeriodDateSorter </h3>

Creates a PeriodDateSorter instance, which sorts periods based on the configuration of the method.

`const sorter = new PeriodDateSorter(periods: Period[])`

* <b> sorter.sort(descending?: boolean, byEndDate?: boolean) </b>
	Based on the configuration provided, it sorts periods ascending/descending by the start date (or if the second argument was set to true - by the end date)

# <h3> DateFilter </h3>

Creates a date filtering instance, which helps to filter unwanted dates.

`const filter = new DateFilter(dates: Date[])

* <b> filter.filterDuplicates(): Date[] </b>
	Filters out duplicate dates from an array

# <h3> PeriodFilter </h3>

Creates a new PeriodFilter instance, which help to filter out unwanted periods from an array.

`const filter = new PeriodFilter(basePeriod: Period)`

* <b> filter.filterPeriods(periods: Period[], conf?: IPeriodFilterConf): Period[] </b>

```
IPeriodFilterConf {
	onlyFullyCovered?: boolean,
	cutPeriodsBeyondTheBoundary?: boolean
}
```
Returns an array of periods based on the configuration. 
If `onlyFullyCovered` is set to true - it will return periods that are included within the boundary of the base period instance.
`cutPeriodsBeyondTheBoundary` - applies the method `cutBoundaries` of the base period instance to each period included in the array.

<h3>  </h3>

<h3> Download & Installation </h3>

```shell
$ npm i -s timeperiod.js
```
<h3> Further plans for development

* Add sorting by duration time
* Add functionality returning only mutual ranges from an array of periods
```
Assuming we have periods A1 - A2 and A3 - A4 and we want to compare them to periods B1 - B2, C1 - C2

Timeline:
A1-----C1-------B1------A2------A3--------C2--------------B2--------A4

It should return an array of periods [
B1 - A2,
A3 - C2
]
```

<h3>Authors or Acknowledgments</h3>
<ul>
  <li>Borys Szygenda</li>
</ul>

<h3>License</h3>

This project is licensed under the MIT License

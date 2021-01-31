
<p align="center"><img src="logo.png" /></p>

<h1 align="center"> Timeperiod.js </h1>

<p align="center"> The package, which helps to organize time ranges. </p>

<hr/>

<p> A common problem when working with periods (from - to) was always to sort, filter and manage these times properly and efficiently. This package is trying to solve (almost) each problem, when it comes to working with multiple periods of time. 
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
period1.change.extendPeriod(20, 'DAYS'); // extends end by 20 days
period1.change.shortenPeriod(15, 'HOURS', true); // shortens start by 15 hours
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
<h3> Period </h3>
`new Period(new Date(), new Date());`


* <b>comparePeriod</b>
	this returns 


<h3> Duration </h3>

<h3> PeriodSorter </h3>

<h3> PeriodFilter </h3>

<h3>  </h3>

<h3> Download & Installation </h3>

```shell
$ npm i -s timeperiod.js
```

<h3>Authors or Acknowledgments</h3>
<ul>
  <li>Borys Szygenda</li>
</ul>

<h3>License</h3>

This project is licensed under the MIT License

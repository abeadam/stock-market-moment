process.env.TZ = 'America/New_York';
import moment from 'moment-business-days';

// source of data
const stockMarketCloserDays = [
  "1/1/2021",
  "1/18/2021",
  "2/15/2021",
  "4/2/2021",
  "5/31/2021",
  "7/5/2021",
  "9/6/2021",
  "11/25/2021",
  "12/24/2021"
];
const marketOpening = moment().set({hour: 9, minutes: 30, seconds: 0});
const marketClose = moment(marketOpening).add({
  hours: 7,
  minutes: 30
});
const totalSecondsInTradingDay = 7.5*60*60;
moment.updateLocale('us', {
  holidays: stockMarketCloserDays,
  holidayFormat: 'MM/DD/YYYY',
  workingWeekdays: [1, 2, 3, 4, 5],
});

// will return the % of the trading day left
function getPercentOfDayLeft(timeToCompare = moment()) {
  if (marketOpening.isSameOrAfter(timeToCompare)) {
    return 1;
  } else if (marketClose.isSameOrBefore(timeToCompare)) {
    return 0;
  }
  const secondsPassed = moment.duration(timeToCompare.subtract(marketOpening)).asSeconds();
  return (totalSecondsInTradingDay - secondsPassed)/totalSecondsInTradingDay;
}

// will return the number of trading days between now a given day
function getTradingDaysDiff(dateToCompare = moment()) {
  const currentDate = moment();
  return dateToCompare.businessDiff(currentDate);
}

const result = getPercentOfDayLeft(moment(marketOpening).add({hours: 3}));
console.log(result);
const dayResult = getTradingDaysLeft(moment("6/15/2021", "MM/DD/YYYY"));
console.log(dayResult);
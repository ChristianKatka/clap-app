(function (message) {
  console.log(message);
})('foo');

const daySwitch = (dayNumber: number) =>
  ({
    1: 'Monday',
    2: 'Tuesday',
    3: 'Wednesday',
    4: 'Thursday',
    5: 'Friday',
    6: 'Saturday',
    7: 'Sunday',
  }[dayNumber]);

console.log(daySwitch(8));

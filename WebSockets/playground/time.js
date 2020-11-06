const moment = require('moment');

// * Using Javascript

const date = new Date();
console.log(date);

const month = date.getMonth();
console.log(month);

// * Using moment (Best package for working with dates and time)

const dateMoment = moment();
console.log(dateMoment);

let dateModified = dateMoment.add(100, 'year');
console.log(dateModified);

dateModified = dateMoment.add(100, 'year').subtract(9, 'month');
console.log(dateModified);

console.log(moment().format('MMM Do YY'));
console.log(moment().format('MMM Do YYYY'));
console.log(moment().format('MMM DD YYYY'));
console.log(moment().format('MM DD YYYY'));
console.log(moment().format('MMM Do, YYYY'));
console.log(moment().format('DD/MM/YYYY'));

console.log(moment().format('h:mm a'));
console.log(moment().format('hh:mm a'));
console.log(moment().format('HH:mm'));

const someTimeStamp = moment().valueOf();
console.log('Miliseconds since 1970', someTimeStamp);

const miliseconds = 1000;
const timeStamp = moment(miliseconds);
console.log(timeStamp.format('DD/MM/YYYY HH:mm:ss'));


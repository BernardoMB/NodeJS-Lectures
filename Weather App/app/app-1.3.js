// No promises

const yargs = require('yargs'); // Interfaz en terminal
const geocode = require('./../own_modules/geocode.js');
const weather = require('./../own_modules/weather.js');

var addressOptions = {describe: 'Address to work with', demand: true, alias: 'a'};
var latOptions = {describe: 'Latitude to search weather forecast for', demand: true, alias: 'lat'};
var lngOptions = {describe: 'Longitude to search weather forecast for', demand: true, alias: 'lng'};
const argv = yargs
    .command('address', 'Search an address.', { address: addressOptions})
    .command('weather', 'Search weather forecast for a location.', { latitude: latOptions, longitude: lngOptions })
    .command('weather-by-address', 'Search weather forcast for an address.', { address: addressOptions})
    .help().alias('help', 'h')
    .argv;

const command = argv._[0];

var handler = (errorMessage, result) => {
    if (errorMessage) {
        console.log(errorMessage);
    } else {
        console.log('Found location');
        console.log(JSON.stringify(result, undefined, 2));
    }
};

var handler2 = (errorMessage, result) => {
    if (errorMessage) {
        console.log(errorMessage);
    } else {
        console.log('Found location');
        console.log(JSON.stringify(result, undefined, 2));
        weather.getWeather(result.latitude, result.longitude, handler);
    }
};

if (command === 'address') {
    geocode.geocodeAddress(argv.address, handler);
} else if (command === 'weather') {
    weather.getWeather(argv.latitude, argv.longitude, handler);
} else if (command === 'weather-by-address') {
    geocode.geocodeAddress(argv.address, handler2);
} else {
    console.log('No command specified');
}

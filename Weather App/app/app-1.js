// No promises

const yargs = require('yargs'); // Interfaz en terminal
const request = require('request'); // Peticiones

const argv = yargs.options({
    a: {
        demand: true,
        alias: 'address',
        describe: 'Address to fetch weather for',
        string: true
    }
}).help().alias('help', 'h').argv;

var encodedAddress = encodeURIComponent(argv.address);
var apiKey = 'AIzaSyAjKVL0P-26C6Qw8TpcK4fskV8gr-alvxE';

var requestObject = {
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${apiKey}`,
    json: true,
    method: 'GET'
}

var callbackArrowFunction = (error, response, body) => {
    if (error) {
        console.log('Unable to reach servers');
        console.log(JSON.stringify(error, undefined, 2));
    } else if (body.status === 'ZERO_RESULTS') {
        console.log('Unable to get location for that address');
    } else {
        console.log(`Address: ${body.results[0].formatted_address}`);
        console.log(`Address: ${body.results[0].geometry.location.lat}`);
        console.log(`Address: ${body.results[0].geometry.location.lng}`);
    }
};

request(requestObject, callbackArrowFunction);
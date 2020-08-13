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

var geocodeAddress = (address) => {
    return new Promise((resolve, reject) => {
        var encodedAddress = encodeURIComponent(address);
        var apiKey = 'AIzaSyAjKVL0P-26C6Qw8TpcK4fskV8gr-alvxE';
        var requestObject = {
            url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${apiKey}`,
            json: true
        };
        console.log('Retriveing location');
        const callbackArrowFunction = (error, response, body) => {
            if (error) {
                console.log(JSON.stringify(error, undefined, 2));
                reject('Unable to connect to google servers');
            } else if (body.status === 'ZERO_RESULTS') {
                reject('Unable to find that address.');
            } else if (body.status === 'OK') {
                var result = {
                    address: body.results[0].formatted_address,
                    latitude: body.results[0].geometry.location.lat,
                    longitude: body.results[0].geometry.location.lng
                };
                resolve(result);
            }
        }
        request(requestObject, callbackArrowFunction);
    });
}

geocodeAddress(argv.address).then((result) => {
    console.log('Result:', JSON.stringify(result, undefined, 2));
}, (error) => {
    console.log('Error ocurred', error);
});
const yargs = require('yargs'); // Interfaz en terminal
const axios = require('axios'); // Peticiones con promesas

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

axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${apiKey}`).then((response) => {
    if (response.data.status === 'ZERO_RESULTS') {
        console.log('Address not found');
    } else if (response.data.status === 'OK') {
        var result = {
            address: response.data.results[0].formatted_address,
            latitude: response.data.results[0].geometry.location.lat,
            longitude: response.data.results[0].geometry.location.lng
        }
        console.log(JSON.stringify(result, undefined, 2));
    }
}, (error) => {
    console.log(error);
});

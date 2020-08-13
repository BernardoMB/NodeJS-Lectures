// No promises

const yargs = require('yargs'); // Interfaz en terminal
const geocode = require('./../own_modules/geocode.js');

const argv = yargs.options({
    a: {
        demand: true,
        alias: 'address',
        describe: 'Address to fetch weather for',
        string: true
    }
}).help().alias('help', 'h').argv;

// TODO: TAREA
/**
 * 1. Llamar la function geocodeAddress (0)
 * 2. Imprimir el mensaje 'Found location' ()
 * 3. Imprimir con JSON.stringify el resultado de geocodeAddress
 * 4. Si geocodeAddress regresa error imprimir el mensaje de error que regresa geocodeAddress
*/ 

// * Solucion:

var handler = (errorMessage, result) => {
    if (errorMessage) {
        console.log(errorMessage);
    } else {
        console.log('Found location');
        console.log(JSON.stringify(result, undefined, 2));
    }
};

geocode.geocodeAddress(argv.address, handler);
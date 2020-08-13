const yargs = require('yargs');

// Imprimir los argumentos del proceso
console.log('Process:', process.argv);

const arguments = yargs.argv;
// Imprimir los argumentos del proceso con el uso del paquete yargs
console.log('Process:', arguments);

const command = arguments._[0];

if (command === 'greet') {
    console.log('Hi!');
} else if (command === 'print') {
    console.log('This is a message');
}
// Imprimir los argumentos del proceso que ejecuta nuestro codigo jsvascript
console.log(process.argv);

var command = process.argv[2];

console.log(command);
console.log(command.split('='));

if (command.split('=')[1] === 'greet') {
    console.log('Hi!');
}
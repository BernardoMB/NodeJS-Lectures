const module_a = require('./scope-a.js');
// Modo 1
console.log(three);
// Modo 2
console.log(module_a.seven());

// Añade funcionalidad
var fs = require('fs');

var myFunction = function(err) {
    if (err) throw err;
    console.log('Datos guardos');
}

// Aqui
fs.appendFile('nombre.txt', 'Tu mensaje', myFunction);

var os = require('os');

console.log(os.userInfo());


const nombre = 'Omar';
const apellido = 'Gomez';

console.log(nombre, apellido);

console.log(nombre + ' ' + apellido);

console.log(`Tu nombre es: ${nombre} ${apellido}`);

console.log(`Mi nombre es: ${os.userInfo().username}`);


var _ = require('lodash');

const myArray = ['1', '2', '2', '3', '4', '4', '4', '5', '6'];

console.log(_.uniq(myArray));


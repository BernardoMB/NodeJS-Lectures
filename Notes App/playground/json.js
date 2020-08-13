// JSON: JavaScriptObjectNotation

// Importar objetos json
/* var info = require('./notes.json');
console.log(info); */

// Declarar objeto javascript
var person = {
    name: 'Omar', // conjunto llave valor: propiedad
    age: 21 // En este caso 'age' es la llave y '21' es el valor
};


console.log(person);
// Ver el tipo de objeto
console.log(typeof person);

// Convertir objeto de javascript en un objeto json
console.log(JSON.stringify(person));
console.log(typeof JSON.stringify(person));

// Redactar obejto de javascript como string:
var personString = '{"name": "Omar", "age": 21}';
console.log(typeof personString);
// Convertir el objeto personString a un objeto javascript
console.log(typeof JSON.parse(personString));
// Ahora si ya podemos leer sus propiedades:
console.log(JSON.parse(personString).name);


// Requerir el paquete FileSystem para escribir a un archivo .json
var fs = require('fs');
// Crear objeto nota:
var note = {
    title: 'Lista',
    body: 'Articulo A, Articulo B'
};
// Convertir el objeto nota a tipo JSON string para que despues lo podamos escribir a un archivo .json
var noteString = JSON.stringify(note);
console.log(noteString);
// Guardar la nota en notes.json utilizando el paquete fs:
fs.writeFileSync('./playground/notes.json', noteString);

// Leer lo guardado
var noteAsString = fs.readFileSync('./playground/notes.json');
// Pasa del buffer leido a un objeto javascript
var note = JSON.parse(noteAsString);
console.log(note);
// Comprobar que se convirtio adecuadamente
console.log(note.title);

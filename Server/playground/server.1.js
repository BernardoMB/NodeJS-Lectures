// Requerir express para programar un servidor
const express = require('express');

// Inicializar apliacion de express
const app = express();

// Decirle a la app que hacer cuando se accede al endpoint GET /
// (1) request: Almacena informacion acerca del la peticion, por ejemplo, headers, body, path, queryParams, etc.
// (2) response: Tiene varios metodos para que podamos contestar la peticion.
app.get('/', (request, response) => {
    // Responder a la peticion (GET /) mandando cierta informacion:
    response.send('Hello world from Express!');
});

// Iniciar la aplicacion en un puerto de la computadora
app.listen(3000);
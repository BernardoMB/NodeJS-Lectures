const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const request = require('request');

// Utilizar objetos JSON en el body de las solicitudes
app.use(bodyParser.json());

// GET /
app.get('/', (request, response) => {
    response.send('Hello world from Express!');
});

// GET /myRoute
app.get('/myRoute', (request, response) => {
    const myObject = {
        name: 'Omar',
        likes: ['football', 'programming']
    };
    response.send(myObject);
});

// POST /phrase
app.post('/phrase', (request, response) => {
    console.log(request.body);
    // Computo 
    const myPhrase = `${request.body.name} likes ${request.body.likes[0]} and ${request.body.likes[1]}`;
    response.status(200).send(myPhrase);
});

// TODO: Tarea
// 1. Programar una ruta POST /sum
// 2. Mandar en el body de la solicitud de esta ruta dos numeros
// 3. Contestar devuelta la suma de los dos numeros

// * Solucion:

// POST /sum
app.post('/sum', (request, response) => {
    const num1 = request.body.num1;
    const num2 = request.body.num2;
    const sum = num1 + num2;
    console.log(sum);
    response.send({sum}); // Regresar numero como objectos exclusivamente
});

var geocodeAddress = (address) => {
    return new Promise((resolve, reject) => {
        var encodedAddress = encodeURIComponent(address);
        var apiKey = 'AIzaSyAjKVL0P-26C6Qw8TpcK4fskV8gr-alvxE';
        var requestObject = {
            url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${apiKey}`,
            json: true
        };
        console.log('Retriveing location');
        request(requestObject, (error, response, body) => {
            if (error) {
                console.log(JSON.stringify(error, undefined, 2));
                const error = {
                    message: 'Unable to connect to google servers',
                    errorCode: 0
                }
                reject(error);
            } else if (body.status === 'ZERO_RESULTS') {
                const error = {
                    message: 'Unable to find that address.',
                    errorCode: 1
                }
                reject(error);
            } else if (body.status === 'OK') {
                var result = {
                    address: body.results[0].formatted_address,
                    latitude: body.results[0].geometry.location.lat,
                    longitude: body.results[0].geometry.location.lng
                };
                resolve(result);
            }
        });
    });
}

// Ruta con parametros de consulta (query params) Ej. path?param1=valor1&param2=valor2

app.get('/getLocation', (request, response) => {
    const queryParams = request.query;
    console.log(queryParams);
    const address = queryParams.address;
    geocodeAddress(address).then((result) => {
        const responseObject = {
            latitude: result.latitude,
            longitude: result.longitude
        }
        response.send(responseObject);
    }, (error) => {
        if (error.errorCode === 0) {
            response.status(503).send(error);
        } else if (error.errorCode === 1) {
            response.status(404).send(error);
        } else {
            response.status(500).send(error);
        }
    });
});

// Ruta con parametros ruta (route params) Ej. path/param1/param2

app.get('/getLocation2/:address', (request, response) => {
    const routeParams = request.params;
    const address = routeParams.address;
    geocodeAddress(address).then((result) => {
        const responseObject = {
            latitude: result.latitude,
            longitude: result.longitude
        }
        response.send(responseObject);
    }, (error) => {
        if (error.errorCode === 0) {
            response.status(503).send(error);
        } else if (error.errorCode === 1) {
            response.status(404).send(error);
        } else {
            response.status(500).send(error);
        }
    });
});

app.listen(3000);
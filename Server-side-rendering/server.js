const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const path = require('path');
const PORT = 3000;

const app = express();

hbs.registerPartials('./views/partials');
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear(); // Current Year
});
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});
app.set('view engine', 'hbs');

const publicDirectoryPath = path.join(__dirname, './public');
app.use(express.static(publicDirectoryPath));

// Use middleware for logs
app.use((request, response, next) => {
    const now = new Date().toString();
    const log = `${now}: ${request.method} ${request.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (error) => {
        if (error) {
            console.log('Unable to append to server.log');
        }
    });
    next();
});

app.use((request, response, next) => {
    const maintenance = true;
    if (maintenance) {
        const dynamicData = {
            pageTitle: 'Maintenance',
            maintenanceMessage: 'Sorry! The site is currently on maintenance.'
        };
        response.render('maintenance.hbs', dynamicData);
    } else {
        next();
    }
});

app.get('/about', (request, response) => {
    const dynamicData = {
        pageTitle: 'About'
    };
    response.render('about.8.hbs', dynamicData);
});

app.get('/help', (request, response) => {
    const queryParams = request.query;
    const name = queryParams.name
    const dynamicData = {
        pageTitle: 'Help',
        name
    };
    response.render('help.8.hbs', dynamicData);
});

// TODO: Tarea
// 1. Create una ruta que se llame /<como tu quieras>.
// 2. La ruta debe devolver un template (.hbs).
// 3. El template debe de contener datos dinamicos, llamadas a funcion helper y debe contener al menos un partial.
// 4. BONUS: que la ruta reciba un query param con tu nombre y los muestre en la vista (template) como un dato dinamico.
// 5. BONUS: que el template contenga una imagen y dos estilos. 

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

const express = require('express');
const path = require('path');
const hbs = require('hbs'); // Templeting (Template: html, xml, o parecido)
const PORT = 3000;

const app = express();

// Partials

hbs.registerPartials('./views/partials');

// Helpers

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear(); // Current Year
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.set('view engine', 'hbs');

const publicDirectoryPath = path.join(__dirname, '../public');
app.use(express.static(publicDirectoryPath));

app.get('/about', (request, response) => {
    const randomNumber = Math.random();
    let title;
    if (randomNumber > 0.5) {
        title = 'My title 2';
    } else {
        title = 'My title 1'
    }
    const dynamicData = {
        pageTitle: title
    };
    response.render('about.7.hbs', dynamicData);
});

app.get('/help', (request, response) => {
    const queryParams = request.query;
    const name = queryParams.name
    const randomNumber = Math.random();
    let title;
    if (randomNumber > 0.5) {
        title = 'My title 2';
    } else {
        title = 'My title 1'
    }
    const dynamicData = {
        pageTitle: title,
        name
    };
    response.render('help.7.hbs', dynamicData);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
const express = require('express');
const path = require('path');
const PORT = 3000;

const app = express();

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
    response.render('about.5.hbs', dynamicData);
});

// TODO: TAREA
// 1. Crear un endpoint llamado /help
// 2. El endpoint debe de devolver una pagina html con datos dinamicos (utilizar hbs)
// 3. Obntener el dato dinamico del query param (hint: localhost:3000/help?name=Omar) y que el dato aparezca en el codigo html

// * Solucion: 

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
    response.render('help.5.hbs', dynamicData);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
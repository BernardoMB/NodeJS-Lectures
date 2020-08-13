const express = require('express');
const path = require('path');

const PORT = 3000;

const app = express();

console.log(__dirname);
console.log(__filename);
console.log(path.join(__dirname, './public'));

// Point to the public directory
const publicDirectoryPath = path.join(__dirname, './public');

// Tell express app the location of public files
app.use(express.static(publicDirectoryPath));

app.get('/getHtmlCode', (request, response) => {
    // Devolver codigo html:
    /** 
     * h hyper
     * t text
     * m markup
     * l language
    */
    response.send(`
        <!-- h1: heading size 1 -->
        <h1>Hello world from HTML</h1>
        <div style="background-color: gray; margin: 80px; padding: 40px; color: white; border: 1px dashed orangered; text-align: center;">Hola. ¿Cómo estas?</div>
    `);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

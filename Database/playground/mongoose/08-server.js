const express = require('express');
const bodyParser = require('body-parser');

const { mongoose } = require('./07-mongoose-connection');
const { mongo } = require('mongoose');

// Mongoose models
const Todo = mongoose.model('Todo', {
    title: {
        type: String,
        require: true,
        // Validation. See all validations here: http://mongoosejs.com/docs/validation.html
        minlength: 1,
        trim: true
    },
    text: {
        type: String,
        minlength: 1,
        trim: true
    },
    category: {
        type: String,
        default: 'Uncategorized'
    },
    priority: {
        type: Number,
        default: 1,
        validate: {
            validator: function(value) {
                if (1 <= value && value <= 5) {
                    return undefined;
                } else {
                    throw new Error('Priority must be a value greater or equal to 1 and smaller or equal to 5');
                }
            },
            message: props => `${props.value} is not a valid priority!`
        },
    },
    completed: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    updatedAt: {
        type: Date,
        default: new Date()
    }
});
const User = mongoose.model('User', {
    email: {
        type: String,
        require: true,
        trim: true,
        minlength: 1,
        unique: true
    },
    name: {
        type: String,
        require: true,
        trim: true,
        minlength: 1
    }
});

const PORT = 3000;
const app = express();

// Use a middleware to parse the body of the request and response
app.use(bodyParser.json());

// POST /todos
app.post('/todos', (request, response) => {
    console.log('Request body', request.body);
    const todo = new Todo({
        ...(request.body)
    });
    todo.save().then((res) => {
        response.send(res);
    }, (err) => {
        response.status(400).send(err);
    });
});

// TODO: TAREA
// 1. Crear otro endpoint (GET) que se llame /todos
// 2. Llamas a la base de datos para extraer todos los todos
// 3. Crear en Postman la solicitud adecuada para obtener todos los todos

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});

// Export the app
module.exports = {
    app,
    Todo,
    User
};

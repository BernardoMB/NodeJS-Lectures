const {ObjectID, ObjectId} = require('mongodb');
const jwt = require('jsonwebtoken');

const {Todo} = require('./../models/todo');
const {User} = require('./../models/user');

// Dummy users
const userOneId = new ObjectID();
const userTwoId = new ObjectID();
const user = [
    {
        _id: userOneId,
        email: 'user1@example.com',
        password: 'Qawsed123',
        tokens: [{
            access: 'auth',
            token: jwt.sign({ _id: userOneId, access: 'auth' }, process.env.JWT_SECRET).toString()
        }]
    }, {
        _id: userTwoId,
        email: 'user2@example.com',
        password: 'Qawsed123',
        tokens: [{
            access: 'auth',
            token: jwt.sign({ _id: userTwoId, access: 'auth' }, process.env.JWT_SECRET).toString()
        }]
    }
];

// Dummy todos
const todos = [
    {
        _id: new ObjectID(),
        title: 'First test todo',
        creator: userOneId
    }, {
        _id: new ObjectID(),
        title: 'Second test todo',
        creator: userTwoId,
        completed: true
    }
];

// TODO: TAREA
// 1. Crear una funcion para popular la base de datos con los todos de arriba que llame 'populateTodos'. 
// HINT: Todo.remove({}) y luego adentro del then utilizar la funcion Todo.insertMany()
// 2. Repetir el mismo proceso para popular la base de datos con los usuarios de arriba.

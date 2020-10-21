const {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');

const {Todo} = require('./../models/todo');
const {User} = require('./../models/user');

// Dummy users (fake data)
const userOneId = new ObjectID();
const userTwoId = new ObjectID();
const users = [
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

// Dummy todos (fake data)
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

// * Solucion

// Alternative 1
const populateUsers = (done) => {
    User.remove({}).then(() => {
        const userOne = new User(users[0]);
        const userTwo = new User(users[1]);
        const promiseOne = userOne.save();
        const promiseTwo = userTwo.save();
        return Promise.all([promiseOne, promiseTwo]);
    }).then(() => {
        done();
    }).catch((error) => {
        console.log(error);
    });
}

// Alternative 2
const populateTodos = (done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos);
    }).then(() => {
        done();
    }).catch((error) => {
        console.log(error);
    });
}

module.exports = {
    users,
    todos,
    populateUsers,
    populateTodos
};

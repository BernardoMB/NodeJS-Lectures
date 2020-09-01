// Object destructuring and find documents of database.

// Object destructuring example:
const user = {
    name: 'Bernardo',
    age: 26
};

// Declare variable 'likes' who's value is going to be the vale of the property 'likes' inside the user object.
const { name, age } = user;

console.log(name);

console.log(age);

// const MongoClient = require('mongodb').MongoClient;
// Apply desstructuring to MongoClient
const { 
    MongoClient, 
    ObjectID, // Handling _id's propperties 
    ObjectId
} = require('mongodb'); // Alternative

// Create a new instance of ObjectID
const objId = ObjectID();

console.log({objId});

const HOST = 'localhost:27017';
const DATABASE = 'TodoApp'; // If 'TodoApp' database does not exists, then the MongoDB server will create the database if and only if we try to write data.

// Connect to MongoDB Server (server running on port localhost:27010)
MongoClient.connect(`mongodb://${HOST}/${DATABASE}`, (error, db) => {
    if (error) {
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');

    // Get the collection and fetch everything inside that collection and then store everything into an Array
    db.collection('Todos').find().toArray().then((docsArray) => {
        if (docsArray.length == 0) {
            return console.log('There are no todos stored in the database');
        }
        console.log('Todos:');
        console.log(docsArray);
    }, (err) => {
        console.log('Unable to fetch todos', err);
        throw err;
    });

    // Fetch only completed items
    db.collection('Todos').find({
        completed: true
    }).toArray().then((docsArray) => {
        if (docsArray.length == 0) {
            return console.log('There are no completed todos');
        }
        console.log('Completed todos:');
        console.log(docsArray);
    }, (err) => {
        console.log('Unable to fetch completed todos', err);
        throw err;
    });

    // Fetch only uncompleted items
    db.collection('Todos').find({
        completed: false
    }).toArray().then((docsArray) => {
        if (docsArray.length == 0) {
            return console.log('There are uncompleted todos');
        }
        console.log('Uncompleted todos:');
        console.log(docsArray);
    }, (err) => {
        console.log('Unable to fetch uncompleted todos', err);
        throw err;
    });

    // Fetch item by Id
    db.collection('Todos').find({
        _id: new ObjectID('5f4857589d2b9d1fc40bb439')
    }).toArray().then((docsArray) => {
        if (docsArray.length == 0) {
            return console.log(`There are no todos with id ${new ObjectID('5f4857589d2b9d1fc40bb439')}`);
        }
        console.log('Todo:');
        console.log(docsArray);
    }, (err) => {
        console.log(`Unable to fetch tpdp with id ${new ObjectID('5f4857589d2b9d1fc40bb439')}`);
        throw err;
    });

    db.close();
});

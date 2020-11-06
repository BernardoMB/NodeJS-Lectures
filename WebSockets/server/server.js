const path = require('path');
// Require http built in package to make some http requests.
const http = require('http');
const express = require('express');
// REquire socket.io package to enable real-time communication.
const socketIO = require('socket.io'); // See https://socket.io/docs/ for documentation.

// Require own modules
const { generateMessage, generateLocationMessage } = require('./utils/message');
// Require/import validation functions.
const { isRealString } = require('./utils/validation');
// Require/import the Users class. 
const { Users } = require('./utils/users');

// Create server (express application)
const PORT = process.env.PORT || 3000;
const app = express();

// Configure Socket.IO
const server = http.createServer(app);
const io = socketIO(server);

// Configure middlewares
const publicPath = path.join(__dirname, '../public');
app.use(express.static(publicPath));

// Instanciate the users class.
const users = new Users();
// Note the users is not an array nor a list.

// Start listening for events from client side.
// With io.on() we will start listening to events. In this case the application will be listening to the 'connection' event.
io.on('connection', (socket) => {
    // Stablish what happens (on the sever) when a client connects to the server.
    console.log('New client connected');

    // (<--) join
    // Stablish what happens (on the server) when a client joins to a room.
    socket.on('join', (params, callback) => {
        if (!isRealString(params.name) || !isRealString(params.room)) {
            return callback('Name and room name are invalid.');
        }
        // Socket.io has its own method to only talk to connections who are in the same room.
        // User .join();
        socket.join(params.room);

        // Add the joined user the list of users in the same room
        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.room);

        // (-->) updateUserList
        // Send to everyone in the room
        io.to(params.room).emit('updateUserList', users.getUserList(params.room));

        callback(null);
    });

    // (<--) disconnect
    // Stablish what happens (on the server) when a client disconnects from the server.
    socket.on('disconnect', () => {
        console.log('User disconnected');
        // Remove the user from the room and update the users list.
        const user = users.removeUser(socket.id);
        // If the user was indeed removed, then notify the all the users in the chat room.
        if (user) {
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newChatMessage', generateMessage('Notification', `${user.name} has left.`));
        }
    });

    // (<--) createChatMessage
    // Stablish what happens when a user sends a message.
    socket.on('createChatMessage', (newMessage, callback) => {
        console.log('Client emitted "createChatMessage" event/notification. Message:', newMessage);
        // get the user who emitted the notification from the client.
        const user = users.getUser(socket.id);
        if (user && isRealString(newMessage.text)) {
            // (-->) newChatMessage
            io.to(user.room).emit('newChatMessage', generateMessage(user.name, newMessage.text));
        }
        // Fire the callback functino provided
        callback();
    });

    // (<--) createLocationMessage
    // Stablish what happens when a user sends a location message.
    socket.on('createLocationMessage', (locationMessage) => {
        console.log('Client emitted "createLocationMessage" event/notification. Message:', locationMessage);
        const user = users.getUser(socket.id);
        if (user) {
            // (-->) newLocationMessage
            io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, locationMessage.latitude, locationMessage.longitude));
        }
    });
});

// Start listening for connections
server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

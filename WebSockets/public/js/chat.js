// To enable real-time communication call 'io()' which is available because socket io javascript code is already loaded in the previous script.
// In the 'io()' call we are initiating the request deom the client to the server to open un web socket and kepp the connection open.
const socket = io();

// Either client or server can emit notifications or listen to them.

// React to notifications

// (<--) connect
// Stablish what happens (on the client) when the client connects to the server.
socket.on('connect', function() {
    console.log('Client connected to server');
    // Get the params from the url when the user access the chat route.
    const params = jQuery.deparam(window.location.search);
    // Tell the server what room the user is joining.
    socket.emit('join', params, function(err) {
        if (err) {
            // console.log(err); // User should know about the error.
            // Better send an alert.
            alert(err);
            // Return user to the root page
            window.location.href = '/';
        } else {
            console.log('Notification send');
        }
    });
});

// (<--) updateUserList
// Add the user to the user list.
socket.on('updateUserList', function(users) {
    const ol = jQuery('<ol></ol>'); // Create the ordered list
    // Populate the ordered list
    users.forEach(user => {
        // Append the list item (li)
        ol.append(jQuery('<li></li>').text(user));
    });
    // So far we have this:
    /* <ol>
        <li>User 1</li>
        <li>User31</li>
        <li>User 3</li>
    </ol> */
    jQuery('#users').html(ol);
});

// (<--) newChatMessage
socket.on('newChatMessage', function(message) {
    console.log('Server emitted "newChatMessage" event/notification. Message:', message);
    // Create the moment at which the message was sent.
    const formattedTime = moment(message.createdAt).format('h:mm a');

    const template = jQuery('#message-template').html();
    const html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formattedTime
    });
    jQuery('#messages').append(html);

    // Scroll to bottom to se the last message
    scrollToBottom();
});

// (<--) newLocationMessage
// Stablish what happens when client receives a location message from server.
socket.on('newLocationMessage', function(locationMessage) {
    console.log('Server emitted "newLocationMessage" event/notification. Message:', locationMessage);
    const formattedTime = moment(locationMessage.createdAt).format('h:mm a');
    const template = jQuery('#location-message-template').html();
    const html = Mustache.render(template, {
        from: locationMessage.from,
        createdAt: formattedTime,
        url: locationMessage.url
    });
    jQuery('#messages').append(html);
    // Scroll to bottom to se the last message
    scrollToBottom();
});

// Actions for sending notifications

// Send message
// When the user submits the form (clicking the send button) the callback function will be fired.
jQuery('#message-form').on('submit', function (event) {
    // Prevent the default behavior: prevent the page from reloding and change the route.
    event.preventDefault();
    const messageTextBox = jQuery('[name=message]');
    const text = messageTextBox.val();
    // (-->) createChatMessage
    socket.emit('createChatMessage', {
        text
    }, function() {
        messageTextBox.val('');
    });
});

// Send location message
// When the user clicks the send location button the callback will be executed.
const locationButton = jQuery('#send-location');
locationButton.on('click', function (event) {
    // Check if the user has access to the location API of the browser.
    // The geolocation API exists on the navigation.location object.
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by your browser');
    }
    // Disable the location button while the location is beeing sent.
    // And set the text to Sending location...
    locationButton.attr('disabled', 'disabled')
        .text('Sending location...');
    // Fetch the user location.
    navigator.geolocation.getCurrentPosition(function (position) {
        // Re-enable the location button and text to normal.
        locationButton.removeAttr('disabled')
            .text('Send location');
        // (-->) createLocationMessage
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function () { // Error handler function.
        // Re-enable the location button and text to normal.
        locationButton.removeAttr('disabled')
            .text('Send location');
        // Let the user know that browser is unable to fetch location.
        alert('Browser unable to fetch location.');
    });
});

// Utility functions

// If there are any new messages, then we need a function to scroll down to the bottom of the massages container in order to see the new messages.
function scrollToBottom() {
    // Selectors
    const messages = jQuery('#messages');
    const newMessage = messages.children('li:last-child');
    // Heights
    const clientHeight = messages.prop('clientHeight');
    const scrollTop = messages.prop('scrollTop');
    const scrollHeight = messages.prop('scrollHeight');
    const newMessageHeight = newMessage.innerHeight();
    const lastMessageHeight = newMessage.prev().innerHeight();
    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        messages.scrollTop(scrollHeight);
    }
}

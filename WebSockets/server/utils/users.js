[{
    id: '/#234ojuonooiu234br43r', // Socket id (connection id)
    name: 'Elber', // Display name for the user
    room: 'Galarga' // The room the user joins
}, {
    id: '/#234ojuonooiu234breasrdferfref43r', // Socket id (connection id)
    name: 'Mike', // Display name for the user
    room: 'Litoris' // The room the user joins
}]

// addUser(id, name, room)
// removeUser(id)
// getUser(id)
// getUserList(room)

// Create a ES6 Users class.
class Users {
    // This constructor gets called when we create a new instance of the user class using the keyword new
    constructor() {
        this.users = [];
    }
    addUser(id, name, room) {
        const user = {id, name, room};
        this.users.push(user);
        return user;
    }
    getUser(id) {
        return this.users.filter((user) => user.id === id)[0];
    }
    removeUser(id) {
        const user = this.getUser(id);
        if (user) {
            this.users = this.users.filter((user) => user.id !== id);
        }
        return user;
    }
    getUserList(room) {
        const users = this.users.filter((user) => user.room === room);
        // .map returns another list with the elements selected (in this case we are salecting the name)
        
        /* const namesArray = [];
        users.forEach((el) => namesArray.push(el.name));
        return namesArray; */
        
        // Alternatively and more efficient:
        const namesArray = users.map((user) => user.name);
        return namesArray;
    }
}

module.exports = {
    Users
};

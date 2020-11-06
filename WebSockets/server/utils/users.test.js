const expect = require('expect');

const {Users} = require('./users');

describe('Users Class', () => {
    let users;

    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: '1', // Socket id (connection id)
            name: 'Elber', // Display name for the user
            room: 'Galarga' // The room the user joins
        }, {
            id: '2', // Socket id (connection id)
            name: 'Mike', // Display name for the user
            room: 'Litoris' // The room the user joins
        },
        {
            id: '3', // Socket id (connection id)
            name: 'Mic', // Display name for the user
            room: 'Litoris' // The room the user joins
        }];
    });

    
    it('should add a new user', ()=> {
        /* users = new Users(); */
        const user = {
            id: '123',
            name: 'Omar',
            room: 'Football Fans'
        };
        users.addUser(user.id, user.name, user.room);
        expect(users.users).toInclude(user);
        // Alternatively
        //expect(users.users).toEqual([user]);
    });

    it('should remove a user', () => {
        const count = users.users.length;
        user = users.removeUser('1');
        expect(users.users.length).toEqual(count - 1);
    });

    it('should not remove user when id is not in the list', () => {
        const id = 9058;
        const count = users.users.length;
        const user = users.removeUser(id);
        expect(user).toEqual(undefined);
        // Alternatively
        expect(user).toNotExist();
        expect(users.users.length).toEqual(count);
    });

    it('should find user', () => {
        const id = '2';
        const user = users.getUser(id);
        expect(user.id).toEqual('2');
    });

    it('should not find user', () => {
        const id = 9058;
        const count = users.users.length;
        const user = users.getUser(id);
        expect(user).toEqual(undefined);
        // Alternatively
        expect(user).toNotExist();
        expect(users.users.length).toEqual(count);
    });

    it('should return user list', () => {
        const userList = users.getUserList('Litoris');
        expect(userList).toInclude('Mike', 'Mic');
    });

    it('should return user list', () => {
        const userList = users.getUserList('Galarga');
        expect(userList).toEqual(['Elber']);
    });
});
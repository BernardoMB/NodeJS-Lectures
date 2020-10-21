const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');
const {User} = require('./../models/user');
const { users, todos, populateUsers, populateTodos } = require('./seed');

beforeEach(populateUsers);
beforeEach(populateTodos);

// * Todos

describe('POST /todos', () => {
    it('should create a new todo', (done) => {
        const title = 'Todo created when testing todo creation endpoint'; 
        request(app)
            .post('/todos')
            .set('Authorization', users[0].tokens[0].token)
            .send({
                title
            })
            .expect(200)
            .expect((response) => {
                expect(response.body.title).toBe(title);
            })
            .end((error, result) => {
                if (error) {
                    return done(error);
                }
                Todo.find({title}).then((todos) => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].title).toBe(title);
                    done();
                }).catch((error) => {
                    done(error);
                });
            });
    });

    it('should not create a todo with invalid body data', (done) => {
        request(app)
            .post('/todos')
            .set('Authorization', users[0].tokens[0].token)
            .send({
                creator: new ObjectID()
            })
            .expect(400)
            .end((error, result) => {
                if (error) {
                    return done(error);
                }
                Todo.find().then((todos) => {
                    expect(todos.length).toBe(2);
                    done();
                }).catch((error) => {
                    done(error);
                });
            });
    });
});

describe('GET /todos/:id', () => {
    it('should return the todo', (done) => {
        const todoId = todos[0]._id.toHexString();
        request(app)
            .get(`/todos/${todoId}`)
            .set('Authorization', users[0].tokens[0].token)
            .expect(200)
            .expect((response) => {
                expect(response.body.title).toBe(todos[0].title);
            })
            .end(done);
    });

    it('should not return the todo created by other user', (done) => {
        const todoId = todos[1]._id.toHexString();
        request(app)
            .get(`/todos/${todoId}`)
            .set('Authorization', users[0].tokens[0].token)
            .expect(404)
            .end(done);
    });

    it('should return 404 if todo not found', (done) => {
        const todoId = (new ObjectID()).toHexString();
        request(app)
            .get(`/todos/${todoId}`)
            .set('Authorization', users[0].tokens[0].token)
            .expect(404)
            .end(done);
    });

    it('should return 400 status if id is not valid', (done) => {
        const todoId = (new ObjectID()).toHexString() + 900;
        request(app)
            .get(`/todos/${todoId}`)
            .set('Authorization', users[0].tokens[0].token)
            .expect(400)
            .end(done);
    });
});

describe('GET /todos', () => {
    it('should return all todos', (done) => {
        request(app)
            .get('/todos')
            .set('Authorization', users[0].tokens[0].token)
            .expect(200)
            .expect((response) => {
                expect(response.body.todos.length).toBe(1);
            })
            .end(done);
    });
});

describe('PATCH /todos/:id', () => {
    it('should update the todo', (done) => {
        const todoId = todos[0]._id.toHexString();
        const text = 'Hacer la tarea';
        request(app)
            .patch(`/todos/${todoId}`)
            .set('Authorization', users[0].tokens[0].token)
            .send({
                text,
                completed: true
            })
            .expect(200)
            .expect((response) => {
                expect(response.body.text).toBe(text);
                expect(response.body.completed).toBe(true);
            })
            .end(done);
    });

    it('should not update the todo created by other user', (done) => {
        const todoId = todos[0]._id.toHexString();
        const text = 'Hacer la tarea';
        request(app)
            .patch(`/todos/${todoId}`)
            .set('Authorization', users[1].tokens[0].token)
            .send({
                text,
                completed: true
            })
            .expect(401)
            .end(done);
    });

    it('should not update the todo with invalida data', (done) => {
        const todoId = todos[0]._id.toHexString();
        const text = 'Hacer la tarea';
        request(app)
            .patch(`/todos/${todoId}`)
            .set('Authorization', users[0].tokens[0].token)
            .send({
                priority: 'High'
            })
            .expect(500)
            .end(done);
    });
});

describe('DELETE /todos/:id', () => {
    it('should remove a todo', (done) => {
        const todoId = todos[1]._id.toHexString();
        request(app)
            .delete(`/todos/${todoId}`)
            .set('Authorization', users[1].tokens[0].token)
            .expect(200)
            .expect((response) => {
                expect(response.body._id).toBe(todoId);
            })
            .end((err, result) => {
                if (err) {
                    return done(err);
                }
                Todo.findById(todoId).then((todo) => {
                    expect(todo).toNotExist();
                    done();
                }).catch((error) => {
                    done(error);
                });
            });
    });

    it('should not remove todo from other user', (done) => {
        const todoId = todos[1]._id.toHexString();
        request(app)
            .delete(`/todos/${todoId}`)
            .set('Authorization', users[0].tokens[0].token)
            .expect(401)
            .end((err, result) => {
                if (err) {
                    return done(err);
                }
                Todo.findById(todoId).then((todo) => {
                    expect(todo).toExist();
                    done();
                }).catch((error) => {
                    done(error);
                });
            });
    });

    it('should return 404 if todo not found', (done) => {
        const todoId = (new ObjectID()).toHexString();
        request(app)
            .delete(`/todos/${todoId}`)
            .set('Authorization', users[0].tokens[0].token)
            .expect(404)
            .end(done);
    });

    it('should return 400 if object id is invalida', (done) => {
        const todoId = '123abc';
        request(app)
            .delete(`/todos/${todoId}`)
            .set('Authorization', users[0].tokens[0].token)
            .expect(400)
            .end(done);
    });
});

// * Users

describe('POST /users', () => {
    it('should create a user', (done) => {
        const email = 'bmondragonbrozon@gmail.com';
        const password = 'Qawsed123';
        request(app)
            .post('/users')
            .send({
                email,
                password
            })
            .expect(200)
            .expect((response) => {
                expect(response.body._id).toExist();
                expect(response.body.email).toBe(email);
            })
            .end((err) => {
                if (err) {
                    return done(err);
                }
                User.findOne({
                    email
                }).then((user) => {
                    expect(user).toExist();
                    expect(user.password).toNotBe(password);
                    done();
                }).catch((e) => {
                    console.log(e);
                    done(e);
                });
            });
    });

    it('should return a validation error if request data is invalid', (done) => {
        request(app)
            .post('/users')
            .send({
                email: 'not_an_email',
                password: 'Qawsed123'
            })
            .expect(400)
            .end(done);
    });

    it('should not create user if email is already in use', (done) => {
        request(app)
            .post('/users')
            .send({
                email: users[0].email,
                password: 'Qawsed123'
            })
            .expect(400)
            .end(done);
    });
});

describe('POST /users/login', () => {
    it('should login user and return auth token', (done) => {
        request(app)
            .post('/users/login')
            .send({
                email: users[1].email,
                password: users[1].password
            })
            .expect(200)
            .expect((response) => {
                expect(response.headers['authorization']).toExist();
            })
            .end((error, response) => {
                if (error) {
                    return done(error);
                }
                User.findById(users[1]._id).then((user) => {
                    expect(user.tokens[1]).toInclude({
                        access: 'auth',
                        token: response.headers['authorization']
                    });
                    done();
                }).catch((e) => {
                    console.log(e);
                    done(e);
                });
            });
    });

    it('should reject invalid credentials', (done) => {
        request(app)
            .post('/users/login')
            .send({
                email: users[1].email,
                password: '1q2w3e4r5t'
            })
            .expect(400)
            .expect((response) => {
                expect(response.headers['authorization']).toNotExist();
            })
            .end((error, response) => {
                if (error) {
                    return done(error);
                }
                User.findById(users[1]._id).then((user) => {
                    expect(user.tokens.length).toBe(1);
                    done();
                }).catch((e) => {
                    done(e);
                });
            });
    });
});

describe('GET /users/me', () => {
    it('should return user if authenticated', (done) => {
        request(app)
            .get('/users/me')
            .set('Authorization', users[0].tokens[0].token)
            .expect(200)
            .expect((response) => {
                expect(response.body._id).toBe(users[0]._id.toHexString());
                expect(response.body.email).toBe(users[0].email);
                expect(response.body.password).toNotExist();
            })
            .end(done);
    });

    it('should return 401 if  not authorized', (done) => {
        request(app)
            .get('/users/me')
            .expect(401)
            .expect((response) => {
                expect(response.body).toEqual({});
            })
            .end(done);
    });
});

describe('DELETE /users/me/token', () => {
    it('should remove auth token on logout', (done) => {
        request(app)
            .delete('/users/me/token')
            .set('Authorization', users[0].tokens[0].token)
            .expect(204)
            .end((error, response) => {
                if (error) {
                    return done(error);
                }
                User.findById(users[0]._id).then((user) => {
                    expect(user.tokens.length).toBe(0);
                    done();
                }).catch((error) => {
                    done(error);
                });
            });
    });
});

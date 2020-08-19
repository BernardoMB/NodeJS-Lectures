const request = require('supertest');
const expect = require('expect'); // Library to make assertions

const app = require('./server').app;

describe('Server', () => {
    it('should return Hello world! response', (done) => {
        request(app).get('/')
            .expect(200)
            .expect('Hello world!')
            .end(done);
    });
});

const request = require('supertest');
const expect = require('expect'); // Library to make assertions

const app = require('./server').app;

describe('Server', () => { // Probar test suite

    // Assertion:
    it('should return Hello world! response', (done) => {
        request(app).get('/')
            .expect(200)
            .expect('Hello world!')
            .end(done);
    });

    it('should return Hello world! response', (done) => {
        request(app).get('/')
            .expect(200)
            .expect('Hello world')
            .end(done);
    });

    it('should return 404 status', (done) => {
        request(app).get('/pageNotFound')
            .expect(404)
            .expect({
                error: 'Page not found.'
            })
            .end(done);
    });

    const expect = require('expect');
    it('should return 409 status', (done) => {
        request(app).get('/someRoute')
            .expect(409)
            .expect((response) => {
                // Here we have access to the response object
                
                // Make a custom assertion:
                expect(response.body.error).toEqual('There was a conflict with your request.');
            })
            .end(done);
    });

    // TODO: TAREA:
    // 1. Programar otra assertion para la ruta users.
    // 2. La assertion tiene que ser satisfactoria y tienes que comprobar que la respuesta tenga estatus 200.
    // 3. Comprobar que el cuerpo de la respuesta sea un arreglo.
    // 4. Comprobar que el arreglo contiene 2 elementos (Hint: arr.length devuelve la cantidad de objetos en el arreglo).
    // 5. Subir el resultado de tu tarea a Git tanto a master como a feature/x (local)

    // The following should pass:
    it('should return 200', (done) => {
        request(app)
            .get('/users') // 1.
            .expect(200) // 2.
            .expect((res) => {
                // 3.
                expect(res.body).toBeInstanceOf(Array);
                //  4.
                expect(res.body).toHaveLength(2);
                expect(res.body.length).toEqual(2);
                
                expect(res.body).toContain([
                    {
                        fullName: 'Omar Gomez Ramirez',
                        age: '21',
                        likes: ['football', 'fifa']
                    },
                    {
                        fullName: 'Bernardo Mondragon Brozon',
                        age: '26',
                        likes: ['football', 'math']
                    }
                ]);
            })
            .end(done);
    });
    
    
});

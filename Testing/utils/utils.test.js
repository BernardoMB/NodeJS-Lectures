const expect = require('expect');
const utils = require('./utils');

it('should add two numbers summing greater than 100', () => {
    const res = utils.add(330, 22);
    if (res <= 100) {
        throw new Error(`Expected something greater than 100 but got ${res}`);
    }
});

it('should add two numbers summing greater than 100', () => {
    const res = utils.add(100, 30);
    expect(res).toBeGreaterThan(100);
});

it('should square a number', () => {
    const num = 3;
    const res = utils.square(num);
    if (res !== num*num) {
        throw new Error(`Expected the number squared but got ${res}`);
    }
});

it('should add tow numbers getting 100', () => {
    const res = utils.add(80,20);
    expect(res).toBe(100);
});

it('should square a number getting a number', () => {
    const res = utils.square(3);
    if (typeof res !== 'number') {
        throw new Error(`Expected a number but got ${typeof res}`);
    }
});

it('should not be equal', () => {
    expect(11).not.toBe(12);
});

describe('Objects', () => {

    it('Objects should be the same', () => {
        /* expect({
            name: 'Omar'
        }).toBe({
            name: 'Omar'
        }); */

        const object = {
            name: 'Omar'
        };
        expect(object).toBe(object);
    });

    it('Objects should be the same', () => {
        expect({
            name: 'Omar'
        }).toEqual({
            name: 'Omar'
        });
    });

    it('Objects should not be equal', () => {
        expect({
            name: 'Bernardo'
        }).not.toEqual({
            name: 'bernardo'
        });
    });

    it('Object should include specified propperty', () => {
        expect({
            firstName: 'Omar',
            lastName: 'Gomez'
        }).toHaveProperty('firstName');
    });

    it('Object should include specified propperty', () => {
        expect({
            firstName: 'Omar',
            lastName: 'Gomez'
        }).toHaveProperty('firstName', 'Omar');
    });

    it('Object should include specified propperty', () => {
        expect({
            username: 'Omar',
            /* password: 'Qawsed123' */
        }).not.toHaveProperty('password');
    });

    it('Should have name and last name set', () => {
        const person = {
            age: '21'
        };
        const res = utils.setName(person, 'Omar Gomez');
        expect(res).toHaveProperty('firstName');
        expect(res).toHaveProperty('lastName');
    });

});

describe('Arrays', () => {
    it('Array should include number 3', () => {
        expect([1,2,3,4,5,6,7,8,9,0]).toContain(3);
    });

    it('Array should not include number 10', () => {
        expect([1,2,3,4,5,6,7,8,9,0]).not.toContain(10);
    });

    describe('Nested describe block', () => {
        it('Array should not include number 10', () => {
            expect([1,2,3,4,5,6,7,8,9,0]).not.toContain(10);
        });
    });
});



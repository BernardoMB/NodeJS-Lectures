// Create a class of type Person
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    getDescription() {
        return `${this.name} is ${this.age} years old`;
    }
}

// Create an object of class Person
const person = new Person('Bernardo', 26);
const personDescription = person.getDescription();
console.log(personDescription);

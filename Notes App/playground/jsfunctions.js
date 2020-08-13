// Arrow functions

// Forma habitual
var square = function(x) {
    return x * x;
}

console.log(square(9)); // 81

// Arrow function
var square2 = (x) => {
    return x * x;
}

console.log(square2(9)); // 81

// Arrow function simple (sin parentesis porque solo pasamos un valor)
var square3 = x => x * x;

console.log(square3(9)); // 81

// La manera menos conveniente
function square4(x) {
    return x * x;
}

console.log(square4(9)); // 81


// Distintos usos

// Definir un objeto cuya propiedad sayHi sea una function
var user = {
    name: 'Omar',
    sayHi: () => {
        console.log('Arguments: ', arguments);
        console.log(`Hi. I am ${this.name}`);
    },
    sayHiAlt() {
        console.log('Arguments: ', arguments);
        console.log(`Hi. I am ${this.name}`);
    }
}

// user.sayHi(1,2,3);

user.sayHiAlt(1,2,3);
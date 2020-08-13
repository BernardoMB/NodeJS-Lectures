// Declarar una promesa
/* var somePromise = new Promise((resolve, reject) => {
    const delay = 4000;
    console.log(`starting delay of ${delay} seconds`);
    setTimeout(() => {
        var resolveObject = {
            message: 'Promise resolved',
            action: 'Something went well as expected'
        };
        var rejectObject = {
            message: 'Promise rejected',
            action: 'Something went wrong'
        };
        var isResolve = false;
        if (isResolve) {
            // Caso exitoso
            resolve(resolveObject);
        } else {
            // Case fallido
            reject(rejectObject);
        }
    }, delay);
}); */

// Llamar el codig de la promise
/* somePromise.then((res) => {
    console.log(JSON.stringify(res, undefined, 2));
}, (loquesea) => {
    console.log(JSON.stringify(loquesea, undefined, 2));
}); */

// Ejemplo practico
var asyncAdd = (a, b) => {
    return new Promise((resolve, reject) => {
        console.log('Starting delay of 5 seconds...');
        setTimeout(() => {
            if (typeof a === 'number' && typeof b === 'number') {
                resolve(a + b);
            } else {
                reject('Cannot add numbers. Arguments must be numbers');
            }
        }, 5000);
    });
};

// Ejecutar promise pasando parametros
/* asyncAdd('y', 6).then((res) => {
    console.log(`Result: ${res}`);
}, (res) => {
    console.log(res);
}); */

// Cadena de promesas estableciendo logica para el resultado de la primer promesa (sin logica para la segunda promesa)
/* asyncAdd(3, 3).then((res) => {
    console.log(`Result: ${res}`);
    return asyncAdd(res, 4);
}, (res) => {
    console.log(res);
}); */

// Cadena de promesas estableciendo logica para el resultado de la primer promesa y logica para el resultado de la segunda
/* asyncAdd(3, 3).then((res) => {
    console.log(`Result: ${res}`);
    return asyncAdd(res, 'g');
}, (res) => {
    console.log('Fallo la primer promesa', res);
}).then((res) => {
    console.log(`Result: ${res}`);
}, (res) => {
    console.log('Fallo la segunda promesa', res);
}); */

// Cadena de promesas pero cachando el error en una sola callback
asyncAdd(2, 2).then((res) => {
    console.log(`Result: ${res}`);
    return asyncAdd(res, 'p');
}).then((res) => {
    console.log(`Result: ${res}`);
    return asyncAdd(res, 6);
}).then((res) => {
    console.log(`Result: ${res}`);
}).catch((res) => {
    console.log('Cadena de promesas fallida:', res);
});


const jwt = require('jsonwebtoken');

const data = {
    id: 10
};

// Generate token.
const secret = 'secret';
const token = jwt.sign(data, secret);

console.log('token', token);
// In https://jwt.io we can paste the token

// Verify that the data was not manipulated with the secret.

// Success case.
let decoded = jwt.verify(token, secret);
console.log('Decoded', decoded);

// Failure case
decoded = jwt.verify(token, secret + 'a');
console.log('Decoded', decoded);


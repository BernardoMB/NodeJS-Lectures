const bcrypt = require('bcryptjs');

const password = '123abc';

// Creates a random value at the ned of what is going to be hashed so nobody can create a a list of hashed words and match the tables to get the real password.
bcrypt.genSalt(10, (error, salt) => {
    bcrypt.hash(password, salt, (error, hash) => {
        console.log('hash', hash);
    });
});

// The generated hash in the previous function call is similar to the following:
const hasedPassword = '$2a$10$VmKDDM0pSUPJnlTpQHsgh.kMIAXKumHsV9T06sx0NQ93ShxJrHrie';

bcrypt.compare(password, hasedPassword, (error, response) => {
    console.log(response);
});

bcrypt.compare('abc123', hasedPassword, (error, response) => {
    console.log(response);
});


const mongoose = require('mongoose');
const validator = requite('validator');

/*
{
    email: 'bmondragonbrozon@gmail.com',
    password: '2793h342h7yng789234yn587k9fy52394875yf345',
    token: [{
        access: 'auth',
        tokens: '03487rncr032489nyrnc3047ry340rkc234yr023'
    }]
}
*/

const User = mongoose.model('User', {
    email: {
        type: String,
        require: true,
        trim: true,
        minlength: 1,
        // The user has to be unique
        unique: true,
        // Search in google: 'mongoose custom validaton' 
        validate: {
            validator: validator.isEmail,
            // Meesage in case email is invalid
            message: '{VALUE} is not a valid email'
        }
    },
    password: {
        type: String,
        require: true,
        minlength: 6,
        validate: {
            validator: (value) => {
                /* if (isValid(value)) {
                    return true;
                } else {
                    return false;
                } */
                return true;
            }
        }
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
});
module.exports = {User};
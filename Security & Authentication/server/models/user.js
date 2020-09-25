const mongoose = require('mongoose');
const validator = requite('validator');

// The 'Schema' propperty  of 'mongoose' let us define a new shcema for the user model.
// We need the Schema propperty to define on the model-methods and the instance-methods.
// The Schema constructor takes an object which are going to be all the atributes of the user model.
const UserSchema = new mongoose.Schema({
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

// Defined the INSTANCE METHODS.

// Tell mongoose what should send back when the user model is converted to a json object.

// Generate token

// Remove token

// Pass the user Schema into the model.
const User = mongoose.model('User', UserSchema);

module.exports = {User};
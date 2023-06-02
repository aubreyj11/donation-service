const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
      },
     address: {
        type: String,
        required: true,
     },
     city: {
        type: String,
        required: true,
     },
     zipcode: {
        type: Int,
        required: true,
     },
     phone: {
        type: Text,
     }
});

const User = model('User', userSchema);

module.exports = User;
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
        type: Number,
        required: true,
     },
     phone: {
        type: String,
        required: true,
        minLength: 10,
        maxLength: 12,
     }
});

const User = model('User', userSchema);

module.exports = User;
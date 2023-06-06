const mongoose = require('mongoose');
const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

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

// set up pre-save middleware to create password
userSchema.pre('save', async function(next) {
   if (this.isNew || this.isModified('password')) {
     const saltRounds = 10;
     this.password = await bcrypt.hash(this.password, saltRounds);
   }
 
   next();
 });
 
 // compare the incoming password with the hashed password
 userSchema.methods.isCorrectPassword = async function(password) {
   return await bcrypt.compare(password, this.password);
 };

const User = mongoose.model('User', userSchema);

module.exports = User;
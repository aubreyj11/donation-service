const { User, FoodDonation, Donation } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
const stripe = require('stripe')('sk_test_51NGsraCQkZ4sTLVltNa0r1BztME6n14v59ZMf4Uyra4c7aODfEaHCZKS92eVnFqp5yuKbfWKYiqnmCj7f9VEnKeM001mCyyH9k');

const resolvers = {
  Query: {
      getUser: async (parent, args, context) => {
        // Check if the user is authenticated
        if (context.user) {
            // If authenticated, find the user in the database using their ID
          const user = await User.findById(context.user._id);   
          return user;
        }
         // Throw an error if the user is not logged in
        throw new AuthenticationError('Not logged in');
      }
    },

  Mutation: {
     // Resolver for the createPaymentIntent mutation setting up stripe payments
    createPaymentIntent: async (parent, { amount, userId }, context) => {
      try {
        // Create a payment intent using the Stripe API
        const paymentIntent = await stripe.paymentIntents.create({
          amount: amount * 100, // Stripe expects amount in cents
          currency: 'usd',
          payment_method_types: ['card'],
        });
  
        // Save the donation details to the database
        const donation = new Donation({ amount, userId });
        const savedDonation = await donation.save();
  
        return { ...savedDonation._doc, clientSecret: paymentIntent.client_secret };
      } catch (error) {
        console.error('Error occurred while creating payment intent:', error);
        throw new Error('An error occurred while processing the donation.');
      }
    },

      updateUser: async (parent, {avatar}, context) => {
          console.log(avatar);
          try {
            // Check if the user is authenticated
              if (context.user)  {

                  const user = await User.findOneAndUpdate(
                      { _id: context.user._id }, 
                      { avatar: avatar }, 
                      {
                          new: true,
                          runValidators: true,
                      }
                  );
                  return user
              }
          } catch (err) {
              console.log(err);
          }    
          throw new AuthenticationError('Not logged in');
        },

      addUser: async (parents, { name, email, password, address, city, zipcode, phone, avatar, foodDonations, donations }) => {
        // Create a new user in the database
        const user = await User.create({ name, email, password, address, city, zipcode, phone, avatar, foodDonations, donations });
        // Generate a JWT token for the user
        const token = signToken(user);
        // Return the token and the user object 
        return { token, user };
      },

      login: async (parent, { email, password }) => {
        //query database to find one user with email (which should be unique)
        const user = await User.findOne({ email });
        if (!user) {
          // Throw an error if the user is not found
          throw new AuthenticationError('Invalid Login Credentials')
        }
         // Check if the provided password is correct
        const correctPw = await user.isCorrectPassword(password);
        if (!correctPw) {
           // Throw an error if the password is incorrect
          throw new AuthenticationError('Invalid Login Credentials');
        }
        // Generate a JWT token for the user
        const token = signToken(user);
        // Return the token and the user object
        return { token, user };
    },

    addFoodDonation: async (parent, { date, time, address, city, zip, comment }, context) => {
      try{
        // Create a new food donation in the database
        const foodDonation = await FoodDonation.create({ date, time, address, city, zip, comment });
        // Add the food donation to the user's list of food donations
        await User.findOneAndUpdate(
            { _id: context.user._id },
            { $addToSet: { foodDonations: { date, time, address, city, zip, comment } } },
            { new: true, runValidators: true}
          );
          return foodDonation;

      } catch (err) {
        console.log(err);
      }
    }
  }
};

module.exports = resolvers;
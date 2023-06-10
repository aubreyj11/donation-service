const { User, FoodDonation, Donation } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
const stripe = require('stripe')('sk_test_51NGsraCQkZ4sTLVltNa0r1BztME6n14v59ZMf4Uyra4c7aODfEaHCZKS92eVnFqp5yuKbfWKYiqnmCj7f9VEnKeM001mCyyH9k');

const resolvers = {
  Query: {
      getUser: async (parent, args, context) => {
        if (context.user) {
          const user = await User.findById(context.user._id);   
          return user;
        }
        throw new AuthenticationError('Not logged in');
      }
    },

  Mutation: {
    createPaymentIntent: async (parent, { amount, userId }, context) => {
      try {
        // Create a payment intent
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
        const user = await User.create({ name, email, password, address, city, zipcode, phone, avatar, foodDonations, donations });
        const token = signToken(user);

        return { token, user };
      },

      login: async (parent, { email, password }) => {
        //query database to find one user with email (which should be unique)
        const user = await User.findOne({ email });
        if (!user) {
          throw new AuthenticationError('Invalid Login Credentials')
        }
        const correctPw = await user.isCorrectPassword(password);
        if (!correctPw) {
          throw new AuthenticationError('Invalid Login Credentials');
        }
        const token = signToken(user);
        return { token, user };
    },

    addFoodDonation: async (parent, { date, time, address, city, zip, comment }, context) => {
      try{
        
        const foodDonation = await FoodDonation.create({ date, time, address, city, zip, comment });
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
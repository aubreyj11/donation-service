const stripe = require('stripe')('pk_test_51NGsraCQkZ4sTLVlAxyxwqDcGmDeKmoI6226SLNoBt9Qe9gcYiRUWi4CTIXJ4pqqO8Wp6uITa49l7XFGbvAfTDBz00jxdaatRC');
const mongoose = require('mongoose');
const Donation = require('./models');
const typeDefs = require('./typeDefs');

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
    createPaymentIntent: async ({ amount, userId }) => {
      try {
        // Create a payment intent
        const paymentIntent = await stripe.paymentIntents.create({
          amount: amount * 100, // Stripe expects amount in cents
          currency: 'usd',
          customer: userId, // Use the Stripe Customer ID associated with the user
          payment_method_types: ['card'],
        });

        // Save the donation details to the database
        const donation = new Donation({ amount, userId });
        await donation.save();

        return { clientSecret: paymentIntent.client_secret };
      } catch (error) {
        console.error('Error occurred while creating payment intent:', error);
        throw new Error('An error occurred while processing the donation.');
      }
    },
  },
};

module.exports = resolvers;
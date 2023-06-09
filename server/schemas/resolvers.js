const stripe = require('stripe')('stripe key placeholder');
const mongoose = require('mongoose');
const Donation = require('./models');
const typeDefs = require('./typeDefs');

const resolvers = {
  Mutation: {
    createPaymentIntent: async (_, { amount, userId }) => {
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
const { ApolloServer, gql } = require('apollo-server');
const stripe = require('stripe')('YOUR_STRIPE_SECRET_KEY');
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/donation_app', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create a Donation model using Mongoose
const Donation = mongoose.model('Donation', {
  amount: Number,
  userId: String,
});

const typeDefs = gql`
  type PaymentIntent {
    clientSecret: String!
  }

  type Mutation {
    createPaymentIntent(amount: Float!, userId: String!): PaymentIntent!
  }
`;

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

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => {
    // Simulated user data
    const user = {
      id: 'USER_ID',
      email: 'user@example.com',
    };

    return { user };
  },
});

server.listen().then(({ url }) => {
  console.log(`Server running at ${url}`);
});
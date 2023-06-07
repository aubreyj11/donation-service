const { User } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { User, Order } = require('../models');
const { signToken } = require('../utils/auth');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

const resolvers = {
    Query: {
         User: async (parent, args, context) => {
        if (context.user) {
          const user = await User.findById(context.user._id).populate({
            path: 'donations',
          });
  
          user.orders.sort((a, b) => b.purchaseDate - a.purchaseDate);
  
          return user;
        }
  
        throw new AuthenticationError('Not logged in');
      },

        order: async (parent, { _id }, context) => {
          if (context.user) {
            const user = await User.findById(context.user._id).populate({
              path: 'orders.donations',
              populate: 'category'
            });
    
            return user.orders.id(_id);
          }

          const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items,
            mode: 'payment',
            success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${url}/`
          });
    
          return { session: session.id };
        }
      },
      addDonate: async (parent, { Order }, context) => {
        console.log(context);
        if (context.user) {
          const order = new Order({ donation });
  
          await User.findByIdAndUpdate(context.user._id, { $push: { orders: order } });
  
          return order;
        }
  
        throw new AuthenticationError('Not logged in');
      },
      updateUser: async (parent, args, context) => {
        if (context.user) {
          return await User.findByIdAndUpdate(context.user._id, args, { new: true });
        }
  
        throw new AuthenticationError('Not logged in');
      },
    
}

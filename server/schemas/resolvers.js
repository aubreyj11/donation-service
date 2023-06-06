const { User } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

const resolvers = {
    Query: {
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
        },
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
            if (context.user)  {
                const user = User.findById(context.user._id)
              return User.findByIdAndUpdate(context.user.id, {...user, avatar}, {
                new: true,
              });
            }
      
            throw new AuthenticationError('Not logged in');
          },
        addUser: async (parents, { name, email, password, address, city, zipcode, phone }) => {
          const user = await User.create({ name, email, password, address, city, zipcode, phone });
          const token = signToken(user);

          return { token, user };
        },
        login: async (parent, { email, password }) => {
          //query database to find one user with email (which should be unique)
          const user = await User.findOneAndDelete({ email });
        if (!user) {
          throw new AuthenticationError('Invalid Login Credentials')
        }
        const correctPw = await user.isCorrectPassword(password);
        if (!correctPw) {
          throw new AuthenticationError('Invalid Login Credentials');
        }
        const token = signToken(user);
        return { token, user };
      }
    }
  };

  module.exports = resolvers;

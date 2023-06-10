const { gql } = require('apollo-server-express');

const typeDefs = gql`
type FoodDonation {
    _id: ID
    date: String
    time: String
    address: String
    city: String
    zip: String
    comment: String
}

type Donation {
    _id: ID
    amount: Float
    userId: String
    clientSecret: String
}

type User {
    _id: ID
    name: String
    email: String
    password: String
    address: String
    city: String
    zipcode: Int
    phone: String
    avatar: String
    foodDonations: [FoodDonation]
    donations: [Donation]
}

type Auth {
    token: ID!
    user: User
  }

type Session {
    session: String!
}

type Query {
    getUser: User
    order: Session
}

type Mutation {
    createPaymentIntent(amount: Float!, userId: String!): Donation
    updateUser(
        avatar: String
      ): User
    addUser(name: String!, email: String!, password: String!, address: String!, city: String!, zipcode: Int!, phone: String!, avatar: String): Auth
    login(email: String!, password: String!): Auth
    addFoodDonation(date: String!, time: String!, address: String!, city: String!, zip: String!, comment: String!): FoodDonation
}`;

module.exports = typeDefs;

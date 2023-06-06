const { gql } = require('apollo-server-express');

const typeDefs = gql`
type User {
    _id: ID
    name: String
    email: String
    password: String
    address: String
    city: String
    zipcode: Int
    phone: String
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
    addUser(name: String!, email: String!, password: String!, address: String!, city: String!, zipcode: Int!, phone: String!): Auth
    login(email: String!, password: String!): Auth
}`;

module.exports = typeDefs;
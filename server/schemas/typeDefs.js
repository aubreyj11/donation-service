const { gql } = require('apollo-server-express');

const typeDefs = gql`
type user {
    _id: ID
    name: String
    email: String
    password: String
    address: String
    city: String
    zipcode: Number
    phone: Number
}
type Mutation {
    addUser(
        name: String!
        email: String!
        password: String!
        address: String!
        city: String!
        zipcode: Number!
        phone: Number!
    ): Auth
    updateUser(
        firstName: String
        lastName: String
        email: String
        password: String
        avatar: String
      ): User
    )
}`;
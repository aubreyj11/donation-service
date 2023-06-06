import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser(
    $name: String!
    $email: String!
    $password: String!
    $address: String!
    $city: String!
    $zipcode: Int!
    $phone: String!
  ) {
    addUser(
      name: $name
      email: $email
      password: $password
      address: $address
      city: $city
      zipcode: $zipcode
      phone: $phone
    ) {
      token
      user {
        _id
      }
    }
  }
`;
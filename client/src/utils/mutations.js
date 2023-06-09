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
    $avatar: String
  ) {
    addUser(
      name: $name
      email: $email
      password: $password
      address: $address
      city: $city
      zipcode: $zipcode
      phone: $phone
      avatar: $avatar
    ) {
      token
      user {
        _id
      }
    }
  }
`;

export const UPDATE_USER = gql` 
  mutation updateUser(
    $avatar: String
  ) {
    updateUser(
      avatar: $avatar
    ) {
      _id
      name
      email
      password
      address
      city
      zipcode
      phone 
      avatar
    }
  }`;

  export const ADD_FOOD_DONATION = gql`
  mutation addFoodDonation(
    $date: String!
    $time: String!
    $address: String!
    $city: String!
    $zip: String!
    $comment: String!
    ) { 
      addFoodDonation(
        date: $date
        time: $time
        address: $address
        city: $city
        zip: $zip
        comment: $comment
      ) {
        _id
        date
        time
        address
        city
        zip
        comment
      }
    }`;

  export const CREATE_PAYMENT_INTENT = gql`
  mutation createPaymentIntent(
    $amount: Float! 
    $userId: String! 
    ) {
      createPaymentIntent(
        amount: $amount
        userId: $userId
      ) {
        _id
        amount
        userId
        clientSecret
      }
    }`;
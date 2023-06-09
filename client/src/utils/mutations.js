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

// export const ADD_DONATION = gql`
// mutation addDonation(
//   $pickupTime: Date!
//   $address: String!
//   $city: String!
//   $zip: Int!
//   $comment: String
//   ) { 
//     addDonation(
//       pickupTime: $pickupTime
//       address: $address
//       city: $city
//       zip: $zip
//       comment: $comment
//     ) {
//       _id
//       pickupTime
//       address
//       city
//       zip
//       comment
//     }
//   }`;
import { gql } from '@apollo/client';

const GET_USER = gql`
query getUser {
    user {
        _id
        name
        email
        password
        address
        city
        zipcode
        phone
    }
}`;

export { GET_USER };
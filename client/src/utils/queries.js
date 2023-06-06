import { gql } from '@apollo/client';

const GET_USER = gql`
query getUser {
    getUser {
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

export { GET_USER }
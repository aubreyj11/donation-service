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
        foodDonations{
            _id
            pickupTime
            address
            city
            zip
            comment            
        }
        donations{
            _id
            amount
            userId
        }
    }
}`;

export { GET_USER }
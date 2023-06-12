import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { Button, Container, Form, Input } from 'semantic-ui-react';
import { loadStripe } from '@stripe/stripe-js';
import { CREATE_PAYMENT_INTENT } from '../utils/mutations';
import { GET_USER } from '../utils/queries';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '../components/CheckoutForm/CheckoutForm';  

// Load the Stripe library with your Stripe publishable key
const stripePromise = loadStripe('pk_test_51NGsraCQkZ4sTLVlAxyxwqDcGmDeKmoI6226SLNoBt9Qe9gcYiRUWi4CTIXJ4pqqO8Wp6uITa49l7XFGbvAfTDBz00jxdaatRC');

const DonationPage = () => {
  
  // State variables to store donation amount and toggle the display of the checkout form
  const [donationAmount, setDonationAmount] = useState('');
  // Mutation and query hooks for executing GraphQL operations
  const [createPaymentIntent] = useMutation(CREATE_PAYMENT_INTENT);
  const { data } = useQuery(GET_USER);
  const user = data?.getUser || {};
  const [showCheckoutForm, setShowCheckoutForm] = useState(false); // State variable to track if the button has been clicked

  // Function to handle the donation process
  const handleDonate = async () => {
    setShowCheckoutForm(true);
    try {
       // Create a payment intent with the provided donation amount and user ID
      const data = await createPaymentIntent({
        variables: { amount: parseFloat(donationAmount), userId: user.name },
      });
      console.log(data);
       // Retrieve the client secret from the response
      const { clientSecret } = data.data.createPaymentIntent;
        // Confirm the card payment using Stripe.js
      const stripe = await stripePromise;
      const { error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: {
            number: '4242424242424242',
            exp_month: 12,
            exp_year: 2023,
            cvc: '123',
          },
        },
      });

       // Handle the payment success or failure
      if (error) {
        console.error('Payment failed:', error.message);
        alert('Payment failed. Please try again.');
      } else {
        console.log('Payment succeeded!');
        alert('Thank you for your donation! It is much appreciated!');
      }
    } catch (error) {
      console.error('Error occurred while processing donation:', error);
      alert('An error occurred while processing your donation. Please try again later.');
    }
  };

  return (
    <Container className='text-center'>
      <h1 style={{ fontSize: '5rem', marginBottom: '1.5rem' }}>Donation Page</h1>
      
      <Form>
        <Form.Field>
          <Input
            type="number"
            label='Enter Donation Amount'
            labelPosition='left'
            placeholder="Enter your donation amount"
            value={donationAmount}
            onChange={(e) => setDonationAmount(e.target.value)}
            size='large'
            />
        </Form.Field>
        {!showCheckoutForm && ( // Render the button only if the form is not shown
          <Button primary onClick={handleDonate} style={{ fontSize: '1.2rem', padding: '0.75rem 1rem' }}>
            Donate
          </Button>
        )}
        {showCheckoutForm && ( // Render the CheckoutForm only if the button is clicked
          <Elements stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        )}
      </Form>
    </Container>
  );
};

export default DonationPage;
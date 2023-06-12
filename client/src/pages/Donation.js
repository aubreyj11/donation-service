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


  const showCheckout = async () => {
    setShowCheckoutForm(true);
  };

  return (
    <Container className='text-center'>
      <div style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>Helping in anyway you can is always greatly appreciated even without food donations we have a long way to go!</div>
      <h1 style={{ fontSize: '6rem', marginBottom: '1.5rem' }}>Donation Page</h1>
      
      <div>
        <Input
          type="number"
          
          labelPosition='left'
          placeholder="Donation amount"
          value={donationAmount}
          onChange={(e) => setDonationAmount(e.target.value)}
          size='large'
        />
        {!showCheckoutForm && (
          <Button primary onClick={showCheckout} style={{ fontSize: '1.2rem', padding: '0.75rem 1rem' }}>
            Donate
          </Button>
        )}
      </div>
      {showCheckoutForm && (
        <Elements stripe={stripePromise}>
            <CheckoutForm createPaymentIntent={createPaymentIntent} user={user} />
        </Elements>
      )}
    </Container>
  );
};

export default DonationPage;
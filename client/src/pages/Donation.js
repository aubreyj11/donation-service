import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { Header, Button, Container, Form, Segment } from 'semantic-ui-react';
import { loadStripe } from '@stripe/stripe-js';
import { CREATE_PAYMENT_INTENT } from '../utils/mutations';

const stripePromise = loadStripe('pk_test_51NGsraCQkZ4sTLVlAxyxwqDcGmDeKmoI6226SLNoBt9Qe9gcYiRUWi4CTIXJ4pqqO8Wp6uITa49l7XFGbvAfTDBz00jxdaatRC');

const DonationPage = () => {
  const [amount, setAmount] = useState('');
  const [createPaymentIntent] = useMutation(CREATE_PAYMENT_INTENT);

  const handleDonate = async () => {
    try {
      // Create a payment  on the server
      const { data } = await createPaymentIntent({
        variables: { amount: parseFloat(amount) },
      });

      const { clientSecret } = data.createPaymentIntent;

      // Loading Stripe with promise
      const stripe = await stripePromise;

      // Confirm the payment with the client secret and Stripe element
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          // card: elements.getElement(CardElement),
        },
      });

      //nessesary bounds used for payment failure
      if (result.error) {
        console.error('Payment failed:', result.error.message);
        alert('Payment failed. Please try again.');
      } else {
        console.log('Payment succeeded!');
        alert('Thank you for your donation, It is much appreciated!');
      }
    } catch (error) {
      console.error('Error occurred while processing donation:', error);
      alert('An error occurred while processing your donation. Please try again later.');
    }
  };

  return (
    <Container style={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'space-between', textAlign:'center'}}>
     <Header as={'h2'} style={{ fontSize: '4rem', marginBottom: '1.5rem' }} content='Donation Page' />
     <Segment attached='bottom'>
      <Form>
        <Form.Field>
          <label style={{ fontSize: '1.5rem' }}>Amount</label>
          <input
            type="number"
            placeholder="Enter your donation amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            style={{
              fontSize: '1.05rem',
              padding: '0.5rem',
              borderRadius: '4px',
              width: '250px',
            }}
          />
        </Form.Field>
        <Button primary onClick={handleDonate} style={{ fontSize: '1.2rem', padding: '0.75rem 1rem' }}>
          Donate
        </Button>
      </Form>
      </Segment>
    </Container>
  );
};

export default DonationPage;
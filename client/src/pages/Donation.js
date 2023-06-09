import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { Button, Container, Form } from 'semantic-ui-react';
import { loadStripe } from '@stripe/stripe-js';

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
          card: elements.getElement(CardElement),
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
    <Container>
      <h1>Donation Page</h1>
      <Form>
        <Form.Field>
          <label>Amount</label>
          <input
            type="number"
            placeholder="Enter your donation amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </Form.Field>
        <Button primary onClick={handleDonate}>
          Donate
        </Button>
      </Form>
    </Container>
  );
};

export default DonationPage;
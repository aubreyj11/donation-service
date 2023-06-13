import React, { useState, useRef } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const CheckoutForm = ({ createPaymentIntent, user }) => {
  const cardElementRef = useRef(null);
  const [errorMessage, setErrorMessage] = useState('');
  const stripe = useStripe();
  const elements = useElements();
  const [donationAmount, setDonationAmount] = useState('');
  
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      setErrorMessage(error.message);
      return;
    }

    try {
      // Create a payment intent with the provided donation amount and user ID
      const { data } = await createPaymentIntent({
        amount: parseFloat(donationAmount),
        userId: user,
      });
     console.log(data);
      // Retrieve the client secret from the response
     const { clientSecret } = data.data.createPaymentIntent;
       // Confirm the card payment using Stripe.js
    //  const stripe = await stripePromise;
     const confirmedPayment = await stripe.confirmCardPayment(clientSecret, {
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
     if (confirmedPayment.error) {
       console.error('Payment failed:', confirmedPayment.error.message);
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
    <form
      onSubmit={handleSubmit}
      style={{
        maxWidth: '500px',
        margin: '0 auto',
        backgroundColor: '#f7f7f7',
        padding: '2rem',
        borderRadius: '4px',
        boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)',
      }}
    >
      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>
          Card Details
        </label>
        <div
          style={{
            background: 'white',
            padding: '1rem',
            borderRadius: '4px',
            boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.1)',
          }}
        >
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: '1rem',
                  '::placeholder': {
                    color: '#aab7c4',
                  },
                },
                invalid: {
                  color: '#9e2146',
                },
              },
            }}
          />
        </div>
      </div>
      {errorMessage && (
        <div style={{ color: '#9e2146', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
          {errorMessage}
        </div>
      )}
      <button
      ref={cardElementRef}
        type="submit"
        disabled={!stripe}
        style={{
          backgroundColor: '#4285f4',
          color: 'white',
          fontSize: '1rem',
          padding: '0.75rem 1rem',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Pay
      </button>
    </form>
  );
};


export default CheckoutForm;

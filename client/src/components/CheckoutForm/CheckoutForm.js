import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const CheckoutForm = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const stripe = useStripe();
  const elements = useElements();

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

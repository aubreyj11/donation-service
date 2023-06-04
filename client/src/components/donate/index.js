import React, { useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useLazyQuery } from '@apollo/client';
import Auth from '../../utils/auth';
import './style.css';

const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

const Donate = () => {
  const [state, dispatch] = useStoreContext();
  const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);

  useEffect(() => {
    if (data) {
      stripePromise.then((res) => {
        res.redirectToCheckout({ sessionId: data.checkout.session });
      });
    }
  }, [data]);

  function submitCheckout() {
    const productIds = [];

    getCheckout({
      variables: { products: productIds },
    });
  }

  return (
    <div className="donate">
      <div className="close" onClick={toggleCart}>
        [close]
      </div>
      <h2>Donate Here</h2>
      {state.cart.length ? (
        <div>
          <div className="flex-row space-between">
            {Auth.loggedIn() ? (
              <button onClick={submitCheckout}>Checkout</button>
            ) : (
              <span>(log in to donate, thankyou!)</span>
            )}
          </div>
        </div>
      ) : (
        <h3>
          You haven't inputed a donation amount!
        </h3>
      )}
    </div>
  );
};

export default Donate;
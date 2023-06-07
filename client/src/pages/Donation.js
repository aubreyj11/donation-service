import React, { useState } from 'react';
import { Link } from 'react-router-dom';



function Signup(props) {
  return (
    <>
    <div className="container my-1">
      <Link to="/login">← Go to Login</Link>
    </div>
    <h2 style={{textAlign: "center"}}>Sign Up</h2>
    <div style={{ margin: '20px', padding: '0px 20px 0px 20px' }}>
    <SignupForm/>
    </div>
    <form action="https://www.paypal.com/donate" method="post" target="_top"></form>
    <button donate-here>Donate Here!</button>
    </>
  );
}

export default Donation;

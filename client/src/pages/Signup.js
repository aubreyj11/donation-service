import React from 'react';
import { Link } from 'react-router-dom';
import SignupForm from '../components/SignupForm';


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
    </>
  );
}

export default Signup;

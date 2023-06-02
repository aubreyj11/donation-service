import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { LOGIN } from '../utils/mutations';
import Auth from '../utils/auth';
import LoginForm from '../components/LoginForm/LoginForm';

function Login(props) {
  return (
    <>
      <div className="container my-1">
        <Link to="/signup">← Go to Signup</Link>
      </div>
      <h2 style={{textAlign: "center"}}>Login</h2>
      <div style={{ margin: '20px', padding: '0px 20px 0px 20px' }}>
         <LoginForm />
      </div>
    </>
  );
}

export default Login;

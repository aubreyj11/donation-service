import React from 'react';
import { Link } from 'react-router-dom';
import SignupForm from '../components/SignupForm';
import { Container, Header } from 'semantic-ui-react';


function Signup(props) {
  return (
    <>
      <div className="container my-1">
        <Link to="/login">← Go to Login</Link>
      </div>
    {/* Container centers and pads signup content */}
      <Container>      
      <Header as='h2' textAlign='center' content='Sign Up' />
        <SignupForm/>
      </Container>
    </>
  );
}

export default Signup;

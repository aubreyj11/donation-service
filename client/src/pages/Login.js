import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import { Container, Header,  } from 'semantic-ui-react';

function Login(props) {
  return (
    <>
      <Container style={{marginTop:'auto', marginBottom: 'auto', minHeight:'400px', display:'flex', flexDirection:'column', justifyContent:'space-between'}}>
        <Link to="/signup">← Go to Signup</Link>
        <Header as="h2" textAlign="center" content="Log In" />
        <LoginForm />
      </Container>
    </>
  );
}

export default Login;

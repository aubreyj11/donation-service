import React from 'react';
import './App.css';
import 'semantic-ui-css/semantic.min.css'

//import components and pages for the app to render
import Header from './components/Header'
import Footer from './components/Footer';
import Home from './pages/Home';
import NoMatch from './pages/NotFound';
import Login from './pages/Login';
import Signup from './pages/Signup';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { StoreProvider } from './utils/GlobalState';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className='App'>
          <StoreProvider>
            <Header />
          <Routes>              
            <Route 
              path="/" 
              element={<Home />} 
            />
            <Route 
              path="/login" 
              element={<Login />} 
            />
            <Route 
              path="/signup" 
              element={<Signup />} 
            />
            <Route 
              path="*" 
              element={<NoMatch />} 
            />
          </Routes>
            <Footer />
          </StoreProvider>
        </div>
      </Router>    
    </ApolloProvider>
    // <>
    // <Header />
    // <Footer />
    // </>
  );
}

export default App;

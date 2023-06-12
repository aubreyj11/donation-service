import React from 'react';
import './App.css';
import 'semantic-ui-css/semantic.min.css'
import AuthService from "./utils/auth";

// Import components and pages for the app to render
import Header from './components/Header'
import Footer from './components/Footer';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import CharityPage from './pages/CharityPage';
import About from './pages/About'
import Donation from './pages/Donation';

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { StoreProvider } from './utils/GlobalState';

// Create an HTTP link for Apollo Client
const httpLink = createHttpLink({
  uri: '/graphql', // URI endpoint for GraphQL server
});

// Create an auth link to set the authorization header
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '', // Attach the token to the authorization header
    },
  };
});

// Create an instance of Apollo Client
const client = new ApolloClient({
  link: authLink.concat(httpLink), // Chain the authLink and httpLink for Apollo Client
  cache: new InMemoryCache(), // Use an in-memory cache
});

// Check if the user is logged in
const loggedIn = AuthService.loggedIn();

// Render the App component
const App = () => {
  return (
    <ApolloProvider client={client}>
      <Router>
        <StoreProvider>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={loggedIn ? <Navigate to="/profile" /> : <Login />} />
            <Route path="/signup" element={loggedIn ? <Navigate to="/profile" /> : <Signup />} />
            <Route path="/profile" element={loggedIn ? <Profile /> : <Navigate to="/login" />} />
            <Route path="/charity" element={<CharityPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/donation" element={loggedIn ? <Donation /> : <Navigate to="/login" />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </StoreProvider>
      </Router>
    </ApolloProvider>
  );
};

export default App;
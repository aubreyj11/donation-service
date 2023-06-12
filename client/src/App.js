import React from 'react';
import './App.css';
import 'semantic-ui-css/semantic.min.css'
import AuthService from "./utils/auth";

//import components and pages for the app to render
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

import { HashRouter as Router , Routes, Route, Navigate } from 'react-router-dom';
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
  uri: '/graphql',
});

// Create an auth link to set the authorization header
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

// Check if the user is logged in
const loggedIn = AuthService.loggedIn();

// Render the App component
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
              path="/charities"
              element={<CharityPage />}
            />
            {/* if use is not logged in will redirect from profile page to login page */}
            <Route
              path="/profile"
              element= {                 
                loggedIn ? <Profile /> : <Navigate replace to ={"/login"}/>
              }
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
              element={<NotFound />} 
            />
            <Route
              path="/about"
              element={<About/>}
            />
            <Route
              path="/donation"
              element={ loggedIn ? <Donation /> : <Navigate replace to ={"/login"}/>}
            />
          </Routes>
            <Footer />
          </StoreProvider>
        </div>
      </Router>    
    </ApolloProvider>
  );
}

export default App;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { ADD_USER } from '../utils/mutations';

function Signup(props) {
    //creates a state for the user signup
  const [formState, setFormState] = useState({ email: '', password: ''});
  const [addUser] = useMutation(ADD_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const mutationResponse = await addUser({
      variables: {
        email: formState.email,
        password: formState.password,
        name: formState.name,
        address: formState.address,
        city: formState.city,
        zipcode: formState.zipcode,
        phone: formState.phone
      },
    });
    const token = mutationResponse.data.addUser.token;
    Auth.login(token);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <div className="container my-1">
      <Link to="/login">← Go to Login</Link>

      <h2>Signup</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="flex-row space-between my-2">
          <label htmlFor="Name">Name:</label>
          <input
            placeholder="Name"
            name="name"
            type="name"
            id="name"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="email">Email:</label>
          <input
            placeholder="youremail@test.com"
            name="email"
            type="email"
            id="email"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="pwd">Password:</label>
          <input
            placeholder="******"
            name="password"
            type="password"
            id="pwd"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="address">Address:</label>
          <input
            placeholder="Address"
            name="address"
            type="address"
            id="address"
            onChange={handleChange}
          />
        </div> 
        <div className="flex-row space-between my-2">
          <label htmlFor="city">City:</label>
          <input
            placeholder="City"
            name="city"
            type="city"
            id="city"
            onChange={handleChange}
          />
        </div> 
        <div className="flex-row space-between my-2">
          <label htmlFor="zipcode">Zip:</label>
          <input
            placeholder="Zip Code"
            name="zipcode"
            type="zipcode"
            id="zipcode"
            onChange={handleChange}
          />
        </div> 
        <div className="flex-row flex-end">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default Signup;

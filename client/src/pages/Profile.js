import React from "react";
import { GET_USER } from "../utils/queries";
import { useQuery } from '@apollo/client';
import { loggedIn } from "../utils/auth";
import { Redirect } from 'react-router-dom'

const Profile = () => {
  const {loading, error, data} = useQuery(GET_USER);

  if (!loggedIn()) {
    return <Redirect to="/login" />;
  };

  if (loading) {
    return <p>Page Loading...</p>
  } else if (error) {
    return <p>Something went wrong!</p>
  } else{
    return (
      <div className="container">
  
      </div>
    );
  }
};

export default Profile;
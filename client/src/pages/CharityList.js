import React from 'react';
import { useQuery } from '@apollo/client';

import CharityList from '../components/CharityList';

import { QUERY_CHARITIES } from '../utils/queries';

const Home = () => {
  const { loading, data } = useQuery(QUERY_CHARITIES);
  const Charities = data?.Charities || [];

  return (
    <main>
      <div className="flex-row justify-center">
        <div className="col-12 col-md-8 my-4">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <CharityList
              Charities={Charities}
              title="Here's the current roster Local Charities"
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter } from 'react-router-dom';
import Routes from './Routes';
import { apolloClient } from '../apollo';
import { store } from '../redux';

const App = () => (
  <ApolloProvider client={apolloClient} store={store}>
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  </ApolloProvider>
);

export default App;

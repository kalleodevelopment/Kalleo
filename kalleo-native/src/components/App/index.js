/* eslint-disable no-underscore-dangle */

import React from 'react';
import { Platform } from 'react-native';
import { ApolloClient, ApolloProvider } from 'react-apollo';
import Config from 'react-native-config';
import RNSegmentIOAnalytics from 'react-native-segment-io-analytics';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import EStyleSheet from 'react-native-extended-stylesheet';
import networkInterfaceWithSubscriptions from '../../config/networkInterfaceWithSubscriptions';
import configureIncomingCall from '../../config/configureIncomingCall';
import GuardAppContainer from '../../containers/GuardAppContainer';
import combineApolloAndRootReducers from '../../redux/reducers';
import theme from '../../styles';

const { SEGMENT_WRITE_KEY } = Config;

var Appsee = require('react-native-appsee');
Appsee.start("2e6333b525bb4f10aa5b167cbf3d9d3f");


// Configure Segment
if (Platform.OS === 'ios') {
  RNSegmentIOAnalytics.setup(SEGMENT_WRITE_KEY, 1);
}

// Set Global Styles
EStyleSheet.build(theme);

// Create Apollo Client
const apolloClient = new ApolloClient({ networkInterface: networkInterfaceWithSubscriptions });

// Redux Dev Tools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Create Redux Store
const store = createStore(
  combineApolloAndRootReducers(apolloClient.reducer()),
  {},
  composeEnhancers(
    applyMiddleware(thunk),
    applyMiddleware(apolloClient.middleware()),
  ),
);

configureIncomingCall(store);

const App = () => (
  <ApolloProvider client={apolloClient} store={store}>
    <GuardAppContainer />
  </ApolloProvider>
);

export default App;

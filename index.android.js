import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { 
  createStore, 
  applyMiddleware, 
  combineReduxers, 
  compose } from 'redux';
import thunkMiddleWare from 'redux-thunk';
import { createLogger } from 'redux-logger';
import reducer from './src/reducers';
import AppContainer from './src/containers/AppContainer';

//checks to see that we are in dev mode (logger only works in dev)
const loggerMiddleware = createLogger({ predicate: (getState, action) => __DEV__ });

function configureStore(initialState) {
  const enhancer = compose(
    applyMiddleware(
      thunkMiddleWare,
      loggerMiddleware,
    ),
  );
  return createStore(reducer, initialState, enhancer);
}

const store = configureStore({}); // arg is normally initial states

import {
  AppRegistry,
} from 'react-native';


const App = () => {
  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  );
};

AppRegistry.registerComponent('Peckish', () => App);

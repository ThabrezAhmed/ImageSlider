/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import devToolsEnhancer from 'remote-redux-devtools';
import Apps from './src';
import createSagaMiddleware from 'redux-saga';
import reducer from './src/redux/reducers/';
import imageSaga from './src/redux/saga/';

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  reducer,
  applyMiddleware(sagaMiddleware),
  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

// run the saga
sagaMiddleware.run(imageSaga);

const App: () => React$Node = () => {
  return (
    <Provider store={store}>
      <Apps />
    </Provider>
  );
};

export default App;

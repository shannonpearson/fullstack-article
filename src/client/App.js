/* eslint-disable */

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import reducers from './reducers/index';
import NavBar from './components/NavBar';
import ArticlesList from './components/ArticlesList';

const App = () => {
  const store = createStore(reducers, applyMiddleware(thunk));

  return (
    <Provider store={store}>
      <div>
        <NavBar />
        <div style={{ height: 70 }} />
        <ArticlesList />
      </div>
    </Provider>
  )
}

export default App;

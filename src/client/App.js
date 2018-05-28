/* eslint-disable */

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import reducers from './reducers/index';
import NavBar from './components/NavBar';
import ArticleList from './components/ArticleList';

class App extends Component {

  render() {
    const store = createStore(reducers, applyMiddleware(thunk));
    return (
      <Provider store={store}>
        <div>
          <NavBar />
          <ArticleList />
        </div>
      </Provider>
    )
  }
}

export default App;

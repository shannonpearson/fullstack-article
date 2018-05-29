/* eslint-disable */

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import reducers from './reducers/index';
import NavBar from './components/NavBar';
import ArticleList from './components/ArticleList';

// could this be totally dumn???
class App extends Component {

  render() {
    const store = createStore(reducers, applyMiddleware(thunk));
    return (
      <Provider store={store}>
        <div>
          <NavBar />
          <div style={{ height: 50}}/>
          <ArticleList/>
        </div>
      </Provider>
    )
  }
}

export default App;

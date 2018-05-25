/* eslint-disable */

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import reducers from './reducers/index';
import NavBar from './components/NavBar';
import ArticleList from './components/ArticleList';

class App extends Component {

  render() {
    const store = createStore(reducers);
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

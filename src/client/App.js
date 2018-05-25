/* eslint-disable */

import React, { Component } from 'react';
import ArticleList from './components/ArticleList';


const sampleData = [
  {
    title: 'Article 1',
    author: 'Author 1',
    body: 'Body 1',
    created: '1/1/01',
    tags:['tag1', 'tag2', 'tag3'],
  },
  {
    title: 'Article 2',
    author: 'Author 2',
    body: 'Body 2',
    created: '2/2/02',
    tags: ['tag1', 'tag4', 'tag3'],
  },
]



class App extends Component {

  render() {
    return (
      <div>
        <ArticleList articles={sampleData} />
      </div>
    )
  }
}

export default App;

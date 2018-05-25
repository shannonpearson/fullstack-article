import React, { Component } from 'react';

class App extends Component {

  render() {
    const date = new Date();

    return (
      <div>
        Hello world!
        { date }
      </div>
    )
  }
}

export default App;

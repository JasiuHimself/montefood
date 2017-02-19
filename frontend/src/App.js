import React, { Component } from 'react';
import Orders from './components/orders'
import './App.css';


class App extends Component {
  // onDivMounted


  render() {
    return (
      <div className="App">
        Witam, bardzo mi miło!
        <Orders />

      </div>
    );
  }
}

export default App;

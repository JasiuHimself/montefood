import React, { Component } from 'react';
import Meal from './meal'

class Orders extends Component {
  render() {
    return (
      <div className="orders">
        This is order:
        <Meal />
      </div>
    );
  }
}

export default Orders;

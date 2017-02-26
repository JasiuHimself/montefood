import React, { Component } from 'react';
class Meal extends Component {
  render() {
    return (
      <li className="meal">
        {this.props.name}, {this.props.price}
      </li>
    );
  }
}
export default Meal;

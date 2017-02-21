import React, { Component } from 'react';


// do mealsów tylko ID ORDERU I W ŚRODKU ITERUJĘ PO MEALACH WŁAŚNIE

class Meal extends Component {

  render() {
    return (
      <li className="meal">
        {this.props.name}
      </li>
    );
  }
}

export default Meal;

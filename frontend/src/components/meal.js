import React, { Component } from 'react';
import $ from 'jquery';

class Meal extends Component {
  componentDidMount(){
    $.ajax({
      url: "api/orders",
    }).done(function(result) {
      this.setState({result: result.data})
    });

  }


  render() {
    return (
      <li className="meal">
        delicious meal
      </li>
    );
  }
}

export default Meal;

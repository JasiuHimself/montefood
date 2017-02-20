import React, { Component } from 'react';
import Meal from './meal'
import $ from 'jquery';

class Orders extends Component {

  // componentDidMount(){
  //   $.ajax({
  //     url: "api/orders",
  //   }).done(function(result) {
  //     this.setState({result: result.data})
  //   });
  //
  // }



  render() {
    return (
      <div className="orders">
        This is one given order:
        <Meal />
      </div>
    );
  }
}

export default Orders;

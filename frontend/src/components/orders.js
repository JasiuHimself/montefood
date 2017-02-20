import React, { Component } from 'react';
import Meal from './meal'
import $ from 'jquery'

class Orders extends Component {

  constructor(){
    super();
    this.state = {
      meals: []
    }
  }

  componentWillMount(){
    $.ajax({
      url: "api/orders/1/meals",
      success: (rec_meals)=>{
        (meal)=>{
          return this.setState({meals: this.state.meals.concat(meal)})
        }
      }
    });
  }

  render() {
    return (
      <div className="order">
        This is one given order number {this.props.order_id}
        <Meal />
      </div>
    );
  }
}

export default Orders;







//
// chcę mieć kontroler
// before action
// ensure authentication
// i tam wymuszam że jak ktoś jest niezalogoawny to np przeniesie na fb

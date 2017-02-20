import React, { Component } from 'react';
import Meal from './meal'
import $ from 'jquery'

class Order extends Component {

  constructor(){
    super();
    this.state = {
      meals: []
    }
  }

  componentWillMount(){
    $.ajax({
      url: "api/orders/2/meals",
      success: (rec_meals)=>{
        (meal)=>{
          return this.setState({meals: this.state.meals.concat(meal)})
        }
      }
    });
  }

  render() {
    return (
      <ul className="order" >
      #{this.props.id} {this.props.status} order from {this.props.restaurant_name}
      </ul>
    );
  }
}

export default Order;







//
// chcę mieć kontroler
// before action
// ensure authentication
// i tam wymuszam że jak ktoś jest niezalogoawny to np przeniesie na fb

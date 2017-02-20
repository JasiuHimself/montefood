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
      type: 'GET',
      url: `api/orders/${this.props.id}/meals`,
      // url: '/api/orders/1/meals/',
      dataType: 'json',
      success: (rec_meals)=>{
        rec_meals.map((meal)=>{
          return this.setState({meals: this.state.meals.concat(meal)})
        })
      }
    });
  }

  render() {
    return (
      <span className="order">
        <h2> #{this.props.id} {this.props.status} order from {this.props.restaurant_name} </h2>
        <ul className="order" >
          {
            this.state.meals.map((meal)=>{
                return(<Meal key={meal.id} name={meal.name}/> )

            })
          }

        </ul>
      </span>
    );
  }
}

export default Order;







//
// chcę mieć kontroler
// before action
// ensure authentication
// i tam wymuszam że jak ktoś jest niezalogoawny to np przeniesie na fb

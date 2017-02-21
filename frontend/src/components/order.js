import React, { Component } from 'react';
import Meal from './meal'
import $ from 'jquery'

class Order extends Component {

  constructor(){
    super();
    this.state = {
      meals: [],
      newMealNameAlert: false,
      newMealPriceAlert: false
    }
  }

  componentWillMount(){
    $.ajax({
      type: 'GET',
      url: `api/orders/${this.props.id}/meals`,
      dataType: 'json',
      success: (rec_meals)=>{
        rec_meals.map((meal)=>{
          return this.setState({meals: this.state.meals.concat(meal)})
        })
      }
    });
  }


_handleNewMeal(event){
  event.preventDefault();
  let error = false
    if (this._newMealName.value.length<2){
      this.setState({newMealNameAlert : true})
      error = true
    }
    else
      this.setState({restaurantNameLengthAlert : false})

    if (this._newMealPrice.value<0){
      this.setState({newMealPriceAlert : true})
      error = true
    }
    else
      this.setState({restaurantNameLengthAlert : false})

    if (error)
      return false

    $.ajax({
      type: 'POST',
      url: `api/orders/${this.props.id}/meals/`,
      data: {
              meal:
                {
                  "name": this._newMealName.value,
                  "price": this._newMealPrice.value,
                  "order_id": this.props.id
                }
            },
      success: console.log('udany ajax')
    });
  }


_newMealForm(){
  return(
    <form onSubmit={this._handleNewMeal.bind(this)}>
      <input type="text" name="mealName" placeholder="Add new meal to order"  ref={(input)=> this._newMealName = input }/>
      <input type="number" name="mealPrice" placeholder="0.00" min="0" step="0.01" ref={(input)=> this._newMealPrice = input } />

      <input type="submit" />
    </form>
  )
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
        {this._newMealForm()}
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

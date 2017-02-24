import React, { Component } from 'react';
import Meal from './meal'
import $ from 'jquery'

class Order extends Component {

  constructor(props){
    super(props);
    this.state = {
      status: this.props.status,
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
  let thisOrder = this
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

      let mealJSON = {
                  "name": this._newMealName.value,
                  "price": this._newMealPrice.value,
                  "order_id": this.props.id
                }

    $.ajax({
      type: 'POST',
      url: `api/orders/${this.props.id}/meals/`,
      data: {meal: mealJSON},
      success:function(responseJSON){
        thisOrder.setState({meals: thisOrder.state.meals.concat(responseJSON)})
      },
      error: function (request, status, error) {
       alert(request.responseText);
      }
    });
  }


_handleOrderStatusChange(event){
  let selectedOption = event.target.value;
  let orderUpdateJSON = {
      "id": this.props.id,
      "status": selectedOption
  }
  let thisApp = this
  $.ajax({
    type: 'PUT',
    url: `api/orders/${this.props.id}`,
    data: {order: orderUpdateJSON},
    success:function(responseJSON){
      console.log(responseJSON["status"])
      thisApp.setState({ status: responseJSON["status"]})
    },
    error: function (request, status, error) {
     alert(request.responseText);
    }
  });


}




  render() {

    let mealForm=""
    if(this.props.status=="ordered"){
      mealForm=
      <form onSubmit={this._handleNewMeal.bind(this)}>
        <input type="text" name="mealName" placeholder="Add new meal to order"  ref={(input)=> this._newMealName = input }/>
        <input type="number" name="mealPrice" placeholder="0.00" min="0" step="0.01" ref={(input)=> this._newMealPrice = input } />
        <input type="submit" />
            { this.state.newMealNameAlert ? <span className="error">Meal name has to have at least 2 characters!</span> : undefined }
            { this.state.newMealPriceAlert ? <span className="error">Meal name has to have positive price!</span> : undefined }

      </form>;
    }



    let statusSelect=
      <select onChange={this._handleOrderStatusChange.bind(this)}
      value = {this.props.status}
      ref="statusSelectMenu">
        <option value="ordered">Ordered</option>
        <option value="finalized">Finalized</option>
        <option value="delivered">Delivered</option>
      </select>;

    return (
      <span className="order">
      {statusSelect}
        <h2> #{this.props.id} {this.props.status} order from {this.props.restaurant_name} </h2>
        <ul className="order" >
          {
              this.state.meals.map((meal)=>{
                  return(<Meal key={meal.id} name={meal.name} price={meal.price}/> )
              })
          }
        </ul>
        {mealForm}
      </span>
    );
  }
}

export default Order;

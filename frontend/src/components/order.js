import React, { Component } from 'react';
import Meal from './meal'
import $ from 'jquery'

class Order extends Component {

  constructor(props){
    super(props);
    this.state = {
      meals: [],
      newMealNameAlert: false,
      newMealPriceAlert: false,
      currentUserAlreadyHasMealInOrder: false
    }
  }

  componentWillMount(){
    let thisApp = this
    $.ajax({
      type: 'GET',
      url: `api/orders/${this.props.id}/meals`,
      dataType: 'json',
      success: (rec_meals)=>{
        rec_meals.map((meal)=>{
          if (meal.user_id === thisApp.props.current_user)
            thisApp.setState({ currentUserAlreadyHasMealInOrder: true})
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
                  "order_id": this.props.id,
                  "user_id": this.props.current_user
                }

    $.ajax({
      type: 'POST',
      url: `api/orders/${this.props.id}/meals/`,
      data: {meal: mealJSON},
      success:function(responseJSON){
        thisOrder.setState({meals: thisOrder.state.meals.concat(responseJSON)})
        thisOrder.setState({ currentUserAlreadyHasMealInOrder : true})
      },
      error: function (request, status, error) {
       alert(request.responseText);
      }
    });
  }



  render() {

    let mealForm=""

    if(this.props.status==="ordered" ){
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
      <select onChange={this.props.handleStatusChange.bind(this)}
      value={this.props.status} id={this.props.id} className="statusSelectMenu"
      ref="statusSelectMenu">
        <option value="ordered">Ordered</option>
        <option value="finalized">Finalized</option>
        <option value="delivered">Delivered</option>
      </select>;

    return (
      <div className="order">
      {statusSelect}
        <div className="orderDescription"> Order from {this.props.restaurant_name} </div>
        <ul>
          {
              this.state.meals.map((meal)=>{
                  return(<Meal key={meal.id} name={meal.name} price={meal.price}/> )
              })
          }
        </ul>
        {   (!this.state.currentUserAlreadyHasMealInOrder) ? mealForm : ""}
      </div>
    );
  }
}

export default Order;

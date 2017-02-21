import React, { Component } from 'react';
import Order from './components/order'
import './App.css';
import $ from 'jquery';



class App extends Component {
  constructor(){
    super();
    this.state={
      orders: [],
      meals: [],
      restaurantNameLengthAlert: false
    };
  }

    componentWillMount(){
      return(
        $.ajax({
            type : 'GET',
            url: 'api/orders',
            dataType: 'json',
            success: (rec_orders)=>{
              rec_orders.map((order)=>{
                return this.setState({orders: this.state.orders.concat(order)})
              })
            }
        })

        )
      }

  _addNewOrder(event){
    let thisApp = this
    let orderJSON = {
                      "restaurant_name": this._newOrderRestaurantName.value,
                      "status": "ordered"
                    }
    event.preventDefault();
    if (this._newOrderRestaurantName.value.length<2){
      this.setState({restaurantNameLengthAlert : true})
      return false
    }
    else
      this.setState({restaurantNameLengthAlert : false})

    $.ajax({
      type: 'POST',
      url: 'api/orders/',
      data: {
              order: orderJSON
            },
      success:
        thisApp.setState({orders: this.state.orders.concat(orderJSON)})
    });
  }

  render(){
    return (
      <div className="App">
        {
          this.state.orders.map((order)=>{
            return(<Order id={order.id}
                           key={order.id}
                           restaurant_name={order.restaurant_name}
                           status={order.status}
            />)
          })

        }

        <form onSubmit={this._addNewOrder.bind(this)}>
          <input type="text" placeholder="Restaurant name" ref={(input)=> this._newOrderRestaurantName = input }/>
          <input type="submit" value="Add order"/>
        </form>
        { this.state.restaurantNameLengthAlert ? <span className="error">Restaurant name has to have at least 2 characters!</span> : undefined }
      </div>
    );
  }


}

export default App;

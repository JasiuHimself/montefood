import React, { Component } from 'react';
import Order from './components/order'
import './App.css';
import $ from 'jquery';



class App extends Component {
  constructor(){
    super();
    this.state={
      display_orders_by_status: "active",
      orders: [],
      meals: [],
      user: {},
      restaurantNameLengthAlert: false
    };
  }

    componentWillMount(){
          this._getOrders()
          let thisApp = this;
          $.ajax({
              type : 'GET',
              url: '/sessions/index',
              dataType: 'json',
              success: (current_user)=>{
                  thisApp.setState({ user: current_user })
              }
          })
    }


  _getOrders(){
    $.ajax({
        type : 'GET',
        url: 'api/orders',
        dataType: 'json',
        success: (rec_orders)=>{
          rec_orders.map((order)=>{
            if (this.state.display_orders_by_status === "active" && order.status === "ordered")
              return this.setState({orders: this.state.orders.concat(order)})
            if (this.state.display_orders_by_status === "history" && (order.status ==="finalized" || order.status === "delivered"))
              return this.setState({orders: this.state.orders.concat(order)})
          })
        }
    })

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
      data: {order: orderJSON},
      success:function(responseJSON){
        thisApp.setState({orders: thisApp.state.orders.concat(responseJSON)})
      },
      error: function (request, status, error) {
         alert(request.responseText);
     }
    });
  }



  _changeOrderStatusToDisplay(event){
    if(event){
      event.preventDefault()
      var el = event.target
      this.setState({display_orders_by_status: el.getAttribute('value')})
    }
    this.setState({orders: []})
    this._getOrders()
  }

  _renderDisplayOrderByStatusMenu(){
    return(
      <div id="orderStatusMenu">
        <div className={this.state.display_orders_by_status==="active" ? "active" :"inactive" }
              value="active"
              onClick={this._changeOrderStatusToDisplay.bind(this)}>
                ACTIVE
        </div>

        <div className={this.state.display_orders_by_status==="history" ? "active" :"inactive" }
            value="history"
            onClick={this._changeOrderStatusToDisplay.bind(this)}>
              HISTORY
        </div>

      </div>

    )
  }

  _displayNewOrderForm(){
    let thisApp = this
    return(
      <form onSubmit={thisApp._addNewOrder.bind(this)}>
        <input type="text" placeholder="Restaurant name" ref={(input)=> thisApp._newOrderRestaurantName = input }/>
        <input type="submit" value="Add order"/>
      </form>
    )
  }


  _handleOrderStatusChange(event){

    let selectedStateOption = event.target.value;
    let orderId = event.target.id;

    let orderUpdateJSON = {
        "id": orderId,
        "status": selectedStateOption
    }
    let thisApp = this
    $.ajax({
      type: 'PUT',
      url: `api/orders/${orderId}`,
      data: {order: orderUpdateJSON},
      success:function(responseJSON){
        thisApp.setState({ status: responseJSON["status"]})
          thisApp._changeOrderStatusToDisplay()
      },
      error: function (request, status, error) {
       alert(request.responseText);
      }
    });


  }

  render(){
    let form = ""
    if (this.state.display_orders_by_status==="active"){
      form =
      <div className="order">
        Place new order
        <form  onSubmit={this._addNewOrder.bind(this)}>
          <input type="text" placeholder="Restaurant name" ref={(input)=> this._newOrderRestaurantName = input }/>
          <input type="submit" value="Add order"/>
        </form>
      </div>
       ;}


    return (
      <div className="App">
      {this._renderDisplayOrderByStatusMenu()}
        {
          this.state.orders.map((order)=>{
            return(<Order id={order.id}
                           key={order.id}
                           restaurant_name={order.restaurant_name}
                           status={order.status}
                           handleStatusChange={this._handleOrderStatusChange.bind(this)}
                           current_user={this.state.user.id}
            />)
          })

        }
        {form}
        { this.state.restaurantNameLengthAlert ? <span className="error">Restaurant name has to have at least 2 characters!</span> : undefined }
      </div>
    );
  }


}

export default App;

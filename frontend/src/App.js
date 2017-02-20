import React, { Component } from 'react';
import Orders from './components/orders'
import './App.css';
import $ from 'jquery';



class App extends Component {
  constructor(){
    super();
    this.state = {
      orders: [],
      meals: []
    };
  }

    componentWillMount(){
          var appThis = this;
          $.ajax({
            type : 'GET',
            url: 'api/orders',
            dataType: 'json',
            success: (res_orders)=>{
              res_orders.map((order)=>{
                this.setState({orders: this.state.orders.concat(order)})
              })
                // this.setState({orders: res_orders})
            }
            // (res_orders)=>{
            //     console.log(res_orders.map(
            //       (order)=>{ order.restaurant_name }))
            //     }

          })
}

  render() {
    return (
      <div className="App">
        Witam, bardzo mi miło! Jestem Twoją aplikacją!
        <Orders />

        return this.state.orders.map((order)=>{
            order.restaurant_name
          });

      </div>
    );
  }
}

export default App;

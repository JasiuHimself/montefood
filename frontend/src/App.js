import React, { Component } from 'react';
import Order from './components/order'
import './App.css';
import $ from 'jquery';



class App extends Component {
  constructor(){
    super();
    this.state={
      orders: [],
      meals: []
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


  render(){
    return (
      <div className="App">
        Witam, bardzo mi miło! Jestem Twoją aplikacją!
        {
          this.state.orders.map((order)=>{
            return(<Order id={order.id}
                           key={order.id}
                           restaurant_name={order.restaurant_name}
                           status={order.status}
            />)
          })

        }

      </div>
    );
  }





}

export default App;

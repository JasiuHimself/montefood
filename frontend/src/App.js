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


render() {
  return (
    <div className="App">
      Witam, bardzo mi miło! Jestem Twoją aplikacją!
      {
        this.state.orders.map((order)=>{
          return(
            <li key={order.id}>
              {order.id}:
              {order.restaurant_name},
              status: {order.status}
            </li>)
        })


        // this.state.meals.map((meal)=>{
        //   return(
        //     <li key={meal.id}>
        //       {meal.id}:
        //       {meal.name},
        //       price: {meal.price}
        //     </li>)
        // })



     }

    </div>
  );
}

}

export default App;

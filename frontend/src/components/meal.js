import React, { Component } from 'react';
import $ from 'jquery';


// do mealsów tylko ID ORDERU I W ŚRODKU ITERUJĘ PO MEALACH WŁAŚNIE

class Meal extends Component {
  // componentDidMount(){
  //   $.ajax({
  //     url: "api/meal",
  //   }).done(function(result) {
  //     this.setState({result: result.data})
  //   });
  //
  // }
  // 
  // _getMeals(){
  //   $.ajax({
  //     url: "api/meal",
  //   }).done(function(result){
  //       this.setState({result: result.data})
  //     });
  //
  //
  // }





  render() {
    return (
      <li className="meal">
        one given meal
      </li>
    );
  }
}

export default Meal;

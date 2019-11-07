import React, { Component } from "react";
import classes from "./OrderSummary.module.css";
import Button from "../../UI/Button/Button";

class OrderSummary extends Component {
  render () {
    const ingredientSummary = Object.keys(this.props.ingredients).map(igKey => {
      return (
        <li key={igKey}>
          <span style={{ textTransform: "capitalize" }}>{igKey}</span>:{" "}
          {this.props.ingredients[igKey]}
        </li>
      );
    });

    return (
      <div className={classes.OrderSummary}>
        <h3>Your Order</h3>
        <p>Your burger as per your ingredients of choice</p>
        <ul>{ingredientSummary}</ul>
        <h4>Your Subtotal: {this.props.price.toFixed(2)}</h4>
        <p>Continue to Checkout?</p>
        <Button btnType="Danger" clicked={this.props.purchaseCanceled}>
          CANCEL
        </Button>
        <Button btnType="Success" clicked={this.props.purchaseContinued}>
          CONTINUE
        </Button>
      </div>
    );
  }
}

export default OrderSummary;

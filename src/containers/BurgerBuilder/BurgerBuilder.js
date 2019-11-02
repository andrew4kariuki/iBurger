import React, { Component } from "react";
import { connect } from "react-redux";

import * as actionTypes from "../../store/actions";

import Aux from "../../hoc/Auxiliary/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

class BurgerBuilder extends Component {
  state = {
    purchaseable: false,
    purchasing: false,
    loadingSpinner: false,
    error: false,
  };

  // componentDidMount() {
  //   console.log(this.props);
  //   axios
  //     .get("https://iburger-f2fb4.firebaseio.com/ingredients.json")
  //     .then(response => {
  //       this.setState({ ingredients: response.data });
  //     })
  //     .catch(error => {
  //       this.setState({ error: true });
  //     });
  // }

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    this.props.history.push("/checkout");
    // alert("You Continued");
  };

  updatePurchaseState (ingredients) {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);

    return sum > 0;
  }

  render () {
    const disableInfo = {
      ...this.props.ings,
    };

    for (const key in disableInfo) {
      disableInfo[key] = disableInfo[key] <= 0;
    }

    let orderSummary = null;

    let burgerUI = this.state.error ? (
      <p style={{ textAlign: "center" }}>OOPS! Cannot fetch ingredients!!</p>
    ) : (
      <Spinner />
    );

    if (this.props.ings) {
      burgerUI = (
        <Aux>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            ingredientRemoved={this.props.onIngredientRemove}
            ingredientAdded={this.props.onIngredientAdded}
            disabled={disableInfo}
            price={this.props.price}
            ordering={this.purchaseHandler}
            purchaseable={this.updatePurchaseState(this.props.ings)}
          />
        </Aux>
      );

      orderSummary = (
        <OrderSummary
          price={this.props.price}
          purchaseContinued={this.purchaseContinueHandler}
          purchaseCanceled={this.purchaseCancelHandler}
          ingredients={this.props.ings}
        />
      );
    }

    if (this.state.loadingSpinner) {
      orderSummary = <Spinner />;
    }

    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burgerUI}
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return { ings: state.ingredients, price: state.totalPrice };
};

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: ingName =>
      dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientName: ingName }),
    onIngredientRemove: ingName =>
      dispatch({
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: ingName,
      }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withErrorHandler(BurgerBuilder, axios));

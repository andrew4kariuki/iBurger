import * as actionTypes from "./actionsTypes";
import axios from "../../axios-orders";

export const addIngredient = name => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientName: name,
  };
};

export const removeIngredient = name => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName: name,
  };
};

export const setIngredient = ingredients => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients: ingredients,
  };
};

export const fetchIngredientsFailed = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED,
  };
};

export const setIngredientPrices = ingredientPrices => {
  return {
    type: actionTypes.SET_INGREDIENT_PRICES,
    ingredientPrices: ingredientPrices,
  };
};

export const fetchIngredientPricesFailed = () => {
  return {
    type: actionTypes.FETCH_INGREDIENT_PRICES_FAILED,
  };
};

export const setInitialPrice = startPrice => {
  return {
    type: actionTypes.SET_INITIAL_PRICE,
    startPrice: startPrice,
  };
};

export const fetchInitialPriceFailed = () => {
  return {
    type: actionTypes.FETCH_INITIAL_PRICE_FAILED,
  };
};

export const initIngredients = () => {
  return dispatch => {
    axios
      .get("https://iburger-f2fb4.firebaseio.com/ingredients.json")
      .then(response => {
        dispatch(setIngredient(response.data));
      })
      .catch(error => {
        dispatch(fetchIngredientsFailed());
      });
  };
};

export const initIngredientPrices = () => {
  return dispatch => {
    axios
      .get("https://iburger-f2fb4.firebaseio.com/ingredientPrices.json")
      .then(response => {
        dispatch(setIngredientPrices(response.data));
      })
      .catch(error => {
        dispatch(fetchIngredientPricesFailed());
      });
  };
};

export const initPrice = () => {
  return dispatch => {
    axios
      .get("https://iburger-f2fb4.firebaseio.com/startPrice.json")
      .then(response => {
        dispatch(setInitialPrice(response.data));
      })
      .catch(error => {
        dispatch(fetchInitialPriceFailed());
      });
  };
};

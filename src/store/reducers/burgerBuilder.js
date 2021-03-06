import * as actionTypes from "../actions/actionsTypes";

import { updateObject } from "../../shared/utility";

const initialState = {
  ingredients: null,
  ingredientPrices: null,
  totalPrice: null,
  error: false,
  building: false,
};

const addIngredient = (state, action) => {
  const updatedIngredient = {
    [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
  };

  const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
  const updatedState = {
    ingredients: updatedIngredients,
    totalPrice:
      state.totalPrice + state.ingredientPrices[action.ingredientName],
    building: true,
  };
  return updateObject(state, updatedState);
};

const removeIngredient = (state, action) => {
  const updatedIngredient = {
    [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
  };
  const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
  const updatedState = {
    ingredients: updatedIngredients,
    totalPrice:
      state.totalPrice - state.ingredientPrices[action.ingredientName],
    building: true,
  };
  return updateObject(state, updatedState);
};

const setIngredients = (state, action) => {
  return updateObject(state, {
    ingredients: action.ingredients,
    error: false,
    building: false,
  });
};

const fetchIngredientFailed = (state, action) => {
  return updateObject(state, { error: true });
};

const setIngredientPrices = (state, action) => {
  return updateObject(state, {
    ingredientPrices: action.ingredientPrices,
    error: false,
  });
};

const fetchIngredientPricesFailed = (state, action) => {
  return updateObject(state, { error: true });
};

const setInitialPrice = (state, action) => {
  return updateObject(state, {
    totalPrice: action.startPrice,
    error: false,
  });
};

const fetchInitialPricesFailed = (state, action) => {
  return updateObject(state, { error: true });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return addIngredient(state, action);

    case actionTypes.REMOVE_INGREDIENT:
      return removeIngredient(state, action);

    case actionTypes.SET_INGREDIENTS:
      return setIngredients(state, action);

    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return fetchIngredientFailed(state, action);

    case actionTypes.SET_INGREDIENT_PRICES:
      return setIngredientPrices(state, action);

    case actionTypes.FETCH_INGREDIENT_PRICES_FAILED:
      return fetchIngredientPricesFailed(state, action);

    case actionTypes.SET_INITIAL_PRICE:
      return setInitialPrice(state, action);

    case actionTypes.FETCH_INITIAL_PRICE_FAILED:
      return fetchInitialPricesFailed(state, action);

    default:
      return state;
  }
};

export default reducer;

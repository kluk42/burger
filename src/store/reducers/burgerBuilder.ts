import { Ingredients } from '../../components/Burger/BurgerIngredient/types';
import { BurgerBuilderInitialState, BurgerBuilderActions } from './types';
import { ActionNames } from '../actions/types';

export const ingredientsPrices = {
  [Ingredients.Bacon]: 0.7,
  [Ingredients.Meat]: 1.3,
  [Ingredients.Cheese]: 0.4,
  [Ingredients.Salad]: 0.5,
};

const initialState: BurgerBuilderInitialState = {
  ingredients: {
    [Ingredients.Bacon]: 0,
    [Ingredients.Cheese]: 0,
    [Ingredients.Meat]: 0,
    [Ingredients.Salad]: 0,
    [Ingredients.SeedsOne]: 1,
    [Ingredients.SeedsTwo]: 1,
  },
  totalPrice: 4,
  isFetching: true,
  error: false,
  building: false,
};

const reducer = (
  state: BurgerBuilderInitialState = initialState,
  action: BurgerBuilderActions
): BurgerBuilderInitialState => {
  switch (action.type) {
    case ActionNames.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.payload.ingredientName]: state.ingredients[action.payload.ingredientName] + 1,
        },
        totalPrice: state.totalPrice + ingredientsPrices[action.payload.ingredientName],
        building: true,
      };
    case ActionNames.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.payload.ingredientName]: state.ingredients[action.payload.ingredientName] - 1,
        },
        totalPrice: state.totalPrice - ingredientsPrices[action.payload.ingredientName],
        building: true,
      };
    case ActionNames.SET_INGREDIENTS:
      return {
        ...state,
        ingredients: {
          ...action.payload.ingredients,
        },
        isFetching: action.payload.fetching,
        error: false,
        totalPrice: 4,
        building: false,
      };
    case ActionNames.FETCH_INGREDIENTS_FAILED:
      return {
        ...state,
        error: action.payload.error,
      };
    case ActionNames.RESET_INGREDIENTS:
      return {
        ...state,
        ingredients: {
          [Ingredients.Bacon]: 0,
          [Ingredients.Cheese]: 0,
          [Ingredients.Meat]: 0,
          [Ingredients.Salad]: 0,
          [Ingredients.SeedsOne]: 1,
          [Ingredients.SeedsTwo]: 1,
        },
      };
    default:
      return state;
  }
};

export default reducer;

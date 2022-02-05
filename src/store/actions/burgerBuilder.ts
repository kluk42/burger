import axios from '../../axios-order';
import { Ingredients } from '../../components/Burger/BurgerIngredient/types';
import { IngredientsToBuildOf } from '../../containers/BurgerBuilder/types';
import {
  ActionNames,
  BurgerBuilderAction,
  DispatchBurgerBuilderAction,
  PurchasableIngredients,
} from './types';

export const addIngredient = (
  ingredient: PurchasableIngredients
): BurgerBuilderAction<ActionNames.ADD_INGREDIENT> => {
  return {
    type: ActionNames.ADD_INGREDIENT,
    payload: {
      ingredientName: ingredient,
    },
  };
};

export const removeIngredient = (
  ingredient: PurchasableIngredients
): BurgerBuilderAction<ActionNames.REMOVE_INGREDIENT> => {
  return {
    type: ActionNames.REMOVE_INGREDIENT,
    payload: {
      ingredientName: ingredient,
    },
  };
};

export const setIngredients = (
  ingredients: IngredientsToBuildOf
): BurgerBuilderAction<ActionNames.SET_INGREDIENTS> => {
  return {
    type: ActionNames.SET_INGREDIENTS,
    payload: {
      ingredients: {
        ...ingredients,
      },
      fetching: false,
    },
  };
};

export const setFetchIngredientsFailed =
  (): BurgerBuilderAction<ActionNames.FETCH_INGREDIENTS_FAILED> => {
    return {
      type: ActionNames.FETCH_INGREDIENTS_FAILED,
      payload: {
        error: true,
      },
    };
  };

export const initIngredients = () => {
  return async (
    dispatch: DispatchBurgerBuilderAction<
      ActionNames.SET_INGREDIENTS | ActionNames.FETCH_INGREDIENTS_FAILED
    >
  ) => {
    try {
      const response = await axios.get(
        'https://burger-feca9-default-rtdb.firebaseio.com/ingredients.json'
      );
      if (response) {
        const ingredients: IngredientsToBuildOf = response.data;
        dispatch(setIngredients(ingredients));
      }
    } catch (err) {
      console.log(err);
      dispatch(setFetchIngredientsFailed());
    }
  };
};

export const resetIngredients = (): BurgerBuilderAction<ActionNames.RESET_INGREDIENTS> => {
  return {
    type: ActionNames.RESET_INGREDIENTS,
    payload: {
      ingredients: {
        [Ingredients.Bacon]: 0,
        [Ingredients.Cheese]: 0,
        [Ingredients.Meat]: 0,
        [Ingredients.Salad]: 0,
        [Ingredients.SeedsOne]: 1,
        [Ingredients.SeedsTwo]: 1,
      },
    },
  };
};

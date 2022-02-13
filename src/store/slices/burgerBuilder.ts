import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Ingredients } from '../../components/Burger/BurgerIngredient/types';
import { IngredientsToBuildOf } from '../../containers/BurgerBuilder/types';
import { BAppThunk } from '../store';
import {
  BurgerBuilderInitialState,
  PayloadFetchingFailed,
  PayloadFetchIngredients,
  PayloadToHandleIngredients,
} from './types';

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

export const slice = createSlice({
  name: 'burgerBuilder',
  initialState,
  reducers: {
    addIngredient: (state, action: PayloadAction<PayloadToHandleIngredients>) => {
      ++state.ingredients[action.payload.ingredientName];
      state.totalPrice += ingredientsPrices[action.payload.ingredientName];
      state.building = true;
    },
    removeIngredient: (state, action: PayloadAction<PayloadToHandleIngredients>) => {
      --state.ingredients[action.payload.ingredientName];
      state.totalPrice -= ingredientsPrices[action.payload.ingredientName];
      state.building = true;
    },
    setIngredients: (state, action: PayloadAction<PayloadFetchIngredients>) => {
      state.ingredients = { ...action.payload.ingredients };
      state.isFetching = action.payload.fetching;
      state.error = false;
      state.totalPrice = 4;
      state.building = false;
    },
    fetchIngredientsFailed: (state, action: PayloadAction<PayloadFetchingFailed>) => {
      state.error = action.payload.error;
    },
    resetIngredients: state => {
      state.ingredients = {
        [Ingredients.Bacon]: 0,
        [Ingredients.Cheese]: 0,
        [Ingredients.Meat]: 0,
        [Ingredients.Salad]: 0,
        [Ingredients.SeedsOne]: 1,
        [Ingredients.SeedsTwo]: 1,
      };
    },
  },
});

export default slice.reducer;

export const {
  addIngredient,
  removeIngredient,
  setIngredients,
  fetchIngredientsFailed,
  resetIngredients,
} = slice.actions;

export const initIngredients = (): BAppThunk => {
  return async dispatch => {
    try {
      const response = await axios.get(
        'https://burger-feca9-default-rtdb.firebaseio.com/ingredients.json'
      );
      if (response) {
        const ingredients: IngredientsToBuildOf = response.data;
        dispatch(setIngredients({ fetching: false, ingredients }));
      }
    } catch (err) {
      console.log(err);
      dispatch(fetchIngredientsFailed({ error: true }));
    }
  };
};

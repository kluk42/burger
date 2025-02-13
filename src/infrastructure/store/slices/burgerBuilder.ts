import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Ingredients } from '../../../hooks/useIngredients/types';
import { BurgerBuilderInitialState, SetIngredients } from './types';

const initialState: BurgerBuilderInitialState = {
  ingredients: {
    [Ingredients.Bacon]: 0,
    [Ingredients.Cheese]: 0,
    [Ingredients.Meat]: 0,
    [Ingredients.Salad]: 0,
    [Ingredients.SeedsOne]: 1,
    [Ingredients.SeedsTwo]: 1,
  },
  building: false,
};

export const slice = createSlice({
  name: 'burgerBuilder',
  initialState,
  reducers: {
    setIngredients: (state, action: PayloadAction<SetIngredients>) => {
      state.ingredients = { ...action.payload.ingredients };

      state.building = false;
    },
    resetIngredients: state => {
      state.ingredients = {
        ...initialState['ingredients'],
      };
    },
  },
});

export default slice.reducer;

export const { setIngredients, resetIngredients } = slice.actions;

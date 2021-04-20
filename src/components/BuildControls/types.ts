import {FC} from 'react';
import { IngredientsToBuildOf } from '../../containers/BurgerBuilder/types';
import { Ingredients } from '../Burger/BurgerIngredient/types';

export interface OwnProps {
    ingredientAdded: (type:Ingredients) => void,
    ingredientRemoved: (type:Ingredients) => void,
    ingredients: IngredientsToBuildOf,
    price: number,
    purchesable: boolean,
    handleOrderBtnClick: () => void,
};

type Ingredient = {
    label: Ingredients.Bacon | Ingredients.Cheese | Ingredients.Salad | Ingredients.Meat
};

export type Controls = Ingredient[];

export type Props = FC<OwnProps>;

import {FC} from 'react';
import {Ingredients} from '../../components/Burger/BurgerIngredient/types';

export type IngredientsToBuildOf = {
    [Ingredients.Bacon]: number,
    [Ingredients.Cheese]: number,
    [Ingredients.Meat]: number,
    [Ingredients.Salad]: number,
    [Ingredients.SeedsOne]: number,
    [Ingredients.SeedsTwo]: number,
};

export enum PriceQueryKey {
    PriceQueryKey = 'price',
}

export interface OwnProps {

}

export type Props = FC<OwnProps>;

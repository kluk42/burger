import { FC } from 'react';
import { IngredientsToBuildOf } from '../../hooks/useIngredients/types';

export interface OwnProps {
  ingredients: IngredientsToBuildOf;
  price: number;
}

export type Props = FC<OwnProps>;

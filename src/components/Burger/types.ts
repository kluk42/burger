import { FC } from 'react';
import { IngredientsToBuildOf } from '../../hooks/useIngredients/types';

export interface OwnProps {
  ingredients: IngredientsToBuildOf;
}

export type Props = FC<OwnProps>;

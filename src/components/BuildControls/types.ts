import { FC } from 'react';
import { PurchasableIngredients } from '../../helpers/calculateTotalPrice';
import { IngredientsToBuildOf } from '../../hooks/useIngredients/types';

export interface OwnProps {
  handleOrderBtnClick: () => void;
  ingredients: IngredientsToBuildOf;
  addIngredient: (ingredient: PurchasableIngredients) => void;
  subtractIngredient: (ingredient: PurchasableIngredients) => void;
}

export type Controls = PurchasableIngredients[];

export type Props = FC<OwnProps>;

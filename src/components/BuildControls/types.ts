import { FC } from 'react';
import { PurchasableIngredients } from '../../infrastructure/store/slices/burgerBuilder';

export interface OwnProps {
  handleOrderBtnClick: () => void;
}

type Ingredient = PurchasableIngredients;

export type Controls = Ingredient[];

export type Props = FC<OwnProps>;

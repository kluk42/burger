import { FC } from 'react';
import { PurchasableIngredients } from '../../store/actions/types';

export interface OwnProps {
  handleOrderBtnClick: () => void;
}

type Ingredient = PurchasableIngredients;

export type Controls = Ingredient[];

export type Props = FC<OwnProps>;

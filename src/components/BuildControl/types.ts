import { FC } from 'react';
import { PurchasableIngredients } from '../../store/slices/burgerBuilder';

export interface OwnProps {
  label: PurchasableIngredients;
}

export type Props = FC<OwnProps>;

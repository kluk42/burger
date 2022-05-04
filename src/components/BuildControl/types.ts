import { FC } from 'react';
import { PurchasableIngredients } from '../../infrastructure/store/slices/burgerBuilder';

export interface OwnProps {
  label: PurchasableIngredients;
}

export type Props = FC<OwnProps>;

import { FC } from 'react';
import { PurchasableIngredients } from '../../helpers/calculateTotalPrice';

export interface OwnProps {
  label: PurchasableIngredients;
  amount: number;
  add: () => void;
  subtract: () => void;
}

export type Props = FC<OwnProps>;

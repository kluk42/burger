import { FC } from 'react';
import { PurchasableIngredients } from '../../store/actions/types';

export interface OwnProps {
  label: PurchasableIngredients;
}

export type Props = FC<OwnProps>;

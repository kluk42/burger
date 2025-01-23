import { FC } from 'react';
import { IngredientsToBuildOf } from '../../hooks/useIngredients/types';
import { Order } from '../ContactData/types';

export type OrderFromServer = Order & { id: string };

export interface OwnProps {
  ingredients: IngredientsToBuildOf;
  price: number;
}

export type Props = FC<OwnProps>;

import { FC } from 'react';
import { Ingredients } from '../../../hooks/useIngredients/types';

export interface OwnProps {
  type: `${Ingredients}` | 'BreadBottom' | 'BreadTop';
}

export type Props = FC<OwnProps>;

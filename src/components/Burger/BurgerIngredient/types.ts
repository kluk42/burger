import { FC } from 'react';

export enum Ingredients {
  BreadBottom = 'BreadBottom',
  BreadTop = 'BreadTop',
  SeedsOne = 'Seeds1',
  SeedsTwo = 'Seeds2',
  Meat = 'Meat',
  Cheese = 'Cheese',
  Salad = 'Salad',
  Bacon = 'Bacon',
}

export interface OwnProps {
  type: Ingredients;
}

export type Props = FC<OwnProps>;

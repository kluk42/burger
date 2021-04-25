import {FC} from 'react';
import {IngredientsToBuildOf} from '../../containers/BurgerBuilder/types';

export interface OwnProps {
    ingredients: IngredientsToBuildOf,
}

export type Props = FC<OwnProps>;

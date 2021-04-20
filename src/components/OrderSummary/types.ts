import {FC} from 'react';
import { IngredientsToBuildOf } from '../../containers/BurgerBuilder/types';

export interface OwnProps {
    ingredients: IngredientsToBuildOf,
    handleCnclClick: () => void,
    handleCntnClick: () => void,
    total: number,
}

export type Props = FC<OwnProps>;

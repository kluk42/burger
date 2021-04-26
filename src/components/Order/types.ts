import {FC} from 'react';
import { IngredientsToBuildOf } from '../../containers/BurgerBuilder/types';
import { InputNames } from '../ContactData/types';

export type OrderObj = {
    [InputNames.Name]: string;
    [InputNames.Email]: string;
    address: {
        [InputNames.Street]: string,
        [InputNames.PostalCode]: string,
    };
    ingredients: IngredientsToBuildOf,
    id: string,
    price: number,
}

export interface OwnProps {
    ingredients: IngredientsToBuildOf
    price: number,
}

export type Props = FC<OwnProps>;

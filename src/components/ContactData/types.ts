import {FC} from 'react';
import { IngredientsToBuildOf } from '../../containers/BurgerBuilder/types';

export interface OwnProps {
    ingredients: IngredientsToBuildOf,
    totalPrice: number,
}

export enum InputNames {
    Name = 'name',
    Email = 'email',
    Address = 'address',
    Street = 'street',
    PostalCode = 'postal-code',
    DeliveryMethod = 'delivery-method',
}

export interface InputData {
    [InputNames.Name]: string;
    [InputNames.Email]: string;
    [InputNames.Street]: string;
    [InputNames.PostalCode]: string;
    [InputNames.DeliveryMethod]: DropDownItems;
}

export enum DropDownItems {
    Fastest = 'fastest',
    Cheapest = 'cheapest',
    OnMyOwn = 'on my own',
}

export type ValidationRule = {
    [key in keyof typeof InputNames]: {
        required: boolean,
    }
}

export type Props = FC<OwnProps>;

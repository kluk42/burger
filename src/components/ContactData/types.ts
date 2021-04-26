import {FC} from 'react';
import { IngredientsToBuildOf } from '../../containers/BurgerBuilder/types';

export interface OwnProps {
    ingredients: IngredientsToBuildOf,
    totalPrice: number,
}

export enum InputNames {
    Name = 'name',
    Email = 'email',
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

export interface ValidationRuleSet {
    required: boolean;
    minLength?: number;
    maxLength?: number;
}

export type Validity = Record<InputNames,boolean>

export type ValidationRules = Record<InputNames,ValidationRuleSet>

export type ValidationMessages = Record<InputNames, string>

export type Props = FC<OwnProps>;

import { FC } from 'react';
import { RegisterOptions } from 'react-hook-form';

export interface OwnProps {}

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
  isEmail?: boolean;
}

export type Order = {
  ingredients: {
    Bacon: number;
    Cheese: number;
    Meat: number;
    Salad: number;
    Seeds1: number;
    Seeds2: number;
  };
  price: number;
  customer: {
    name: string;
    address: {
      street: string;
      zipCode: number;
      country: string;
    };
    email: string;
    id: string;
  };
  deliveryMethod: DropDownItems;
};

export type Validity = Record<InputNames, boolean>;

export type ValidationRules = Record<InputNames, RegisterOptions>;

export type ValidationMessages = Record<InputNames, string>;

export type Props = FC<OwnProps>;

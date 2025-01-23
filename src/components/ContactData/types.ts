import { FC } from 'react';
import { RegisterOptions } from 'react-hook-form';
import { DeliveryMethods } from '../../hooks/usePurchaseBurger/types';

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
  [InputNames.DeliveryMethod]: DeliveryMethods;
}

export interface ValidationRuleSet {
  required: boolean;
  minLength?: number;
  maxLength?: number;
  isEmail?: boolean;
}

export type Validity = Record<InputNames, boolean>;

export type ValidationRules = Record<InputNames, RegisterOptions>;

export type ValidationMessages = Record<InputNames, string>;

export type Props = FC<OwnProps>;

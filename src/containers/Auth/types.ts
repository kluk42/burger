import { FC } from 'react';

export enum InputNames {
  Email = 'email',
  Password = 'password',
}

export interface ValidationRuleSet {
  required: boolean;
  minLength?: number;
  maxLength?: number;
  isEmail?: boolean;
}

export type ValidationRules = Record<InputNames, ValidationRuleSet>;

export interface InputData {
  [InputNames.Email]: string;
  [InputNames.Password]: string;
}

export interface OwnProps {}

export type Validity = Record<InputNames, boolean>;
export type Props = FC<OwnProps>;
export type ValidationMessages = Record<InputNames, string>;

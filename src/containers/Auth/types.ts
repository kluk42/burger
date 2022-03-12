import { FC } from 'react';
import { RegisterOptions } from 'react-hook-form';

export enum InputNames {
  Email = 'email',
  Password = 'password',
}

export type ValidationRules = Record<InputNames, RegisterOptions>;

export interface InputData {
  [InputNames.Email]: string;
  [InputNames.Password]: string;
}

export interface OwnProps {}

export type Validity = Record<InputNames, boolean>;
export type Props = FC<OwnProps>;
export type ValidationMessages = Record<InputNames, string>;

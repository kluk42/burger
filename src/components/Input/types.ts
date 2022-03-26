import { FC } from 'react';
import { FieldError } from 'react-hook-form';

type BaseInputType = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export type OwnProps = {
  errors?: { [key: string]: FieldError };
  isTouched: boolean;
} & BaseInputType;

export type Props = FC<OwnProps>;

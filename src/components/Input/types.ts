import { FC } from 'react';

type BaseInputType = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export type OwnProps = {
  invalid?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  validationMessage?: string;
} & BaseInputType;

export type Props = FC<OwnProps>;

import { FC } from 'react';

type BaseButtonType = React.DetailedHTMLProps<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
>;

export type OwnProps = {
  label: string;
  value: string;
  options: string[];
} & BaseButtonType;

export type Props = FC<OwnProps>;

import { FC } from 'react';

type BaseButtonType = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export enum Theme {
  Success = 'success',
  Danger = 'danger',
}

export type OwnProps = {
  theme: Theme;
  isSubmit?: boolean;
} & BaseButtonType;

export type Props = FC<OwnProps>;

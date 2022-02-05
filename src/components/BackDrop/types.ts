import { FC } from 'react';

export interface OwnProps {
  show: boolean;
  handleClick: () => void;
}

export type Props = FC<OwnProps>;

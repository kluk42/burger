import { FC } from 'react';

export interface OwnProps {
  handleMenuClick: () => void;
}

export type Props = FC<OwnProps>;

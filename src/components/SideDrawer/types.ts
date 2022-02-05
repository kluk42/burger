import { FC } from 'react';

export interface OwnProps {
  handleBackDropClick: () => void;
  isSideDrawerOpen: boolean;
}

export type Props = FC<OwnProps>;

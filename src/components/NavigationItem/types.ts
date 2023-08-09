import { FC } from 'react';

export interface OwnProps {
  link: string;
  exact: boolean;
  handleLinkClick?: () => void;
  children?: React.ReactNode;
}

export type Props = FC<OwnProps>;

import { FC, ReactNode } from 'react';

export interface OwnProps {
  children?: ReactNode;
}

export type Props = FC<OwnProps>;

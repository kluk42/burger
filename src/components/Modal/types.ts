import { FC } from 'react';

export interface OwnProps {
  show: boolean;
  handleRenderModal: () => void;
  children?: React.ReactNode;
}

export type Props = FC<OwnProps>;

import { FC } from 'react';

export interface OwnProps {
  handleCnclClick: () => void;
  handleCntnClick: () => void;
}

export type Props = FC<OwnProps>;

import {FC} from 'react';

type BaseInputType = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export type OwnProps = {
} & BaseInputType;

export type Props = FC<OwnProps>;

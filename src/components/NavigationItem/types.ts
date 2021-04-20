import {FC} from 'react';

export interface OwnProps {
    link: string,
    active?: boolean
}

export type Props = FC<OwnProps>;

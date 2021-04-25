import {FC} from 'react';

export interface OwnProps {
    link: string,
    exact: boolean,
}

export type Props = FC<OwnProps>;

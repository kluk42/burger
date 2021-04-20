import {FC} from 'react';

export enum Theme {
    Success = 'success',
    Danger = 'danger',
}

export interface OwnProps {
    handleClick: () => void,
    theme: Theme
}

export type Props = FC<OwnProps>;

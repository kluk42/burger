import {FC} from 'react';

export interface OwnProps {
    link: string,
    exact: boolean,
    handleLinkClick?: () => void,
}

export type Props = FC<OwnProps>;

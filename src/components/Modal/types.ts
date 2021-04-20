import {FC} from 'react';

export interface OwnProps {
    show: boolean,
    handleRenderModal: () => void,
}

export type Props = FC<OwnProps>;

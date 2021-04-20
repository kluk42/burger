import {memo} from 'react';

import Modal from './Modal';

import {Props} from './types';

export default memo<Props>(Modal, (props, nextProps) => {
    return ((props.show === nextProps.show) && (props.children === nextProps.children))
});

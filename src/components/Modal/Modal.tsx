import {Props} from './types';
import './Modal.scss';

import Backdrop from '../BackDrop/index';

const Modal: Props = ({children, show, handleRenderModal}) => {
    return (
        <>
        <Backdrop show={show} handleClick={handleRenderModal}/>
        <div className={`Modal ${show && 'Modal_visible'}`}>
            {children}
        </div>
        </>
    )
}

export default Modal;

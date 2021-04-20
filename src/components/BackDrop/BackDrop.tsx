import {Props} from './types';
import './BackDrop.scss';

const BackDrop: Props = ({show, handleClick}) => {
    return show ? <div className="Backdrop" onClick={handleClick}/> : null
}

export default BackDrop;

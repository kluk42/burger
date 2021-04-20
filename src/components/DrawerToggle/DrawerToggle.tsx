import {Props} from './types';
import './DrawerToggle.scss';

const DrawerToggle: Props = ({handleMenuClick}) => {
    return (
        <div onClick={handleMenuClick} className="DrawerToggle">
            <div className={"DrawerToggle__btn"}/>
            <div className={"DrawerToggle__btn"}/>
            <div className={"DrawerToggle__btn"}/>
        </div>
    )
}

export default DrawerToggle;

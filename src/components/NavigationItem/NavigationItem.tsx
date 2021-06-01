import {NavLink} from 'react-router-dom';

import {Props} from './types';
import './NavigationItem.scss';

const NavigationItem: Props = ({children, link, exact, handleLinkClick}) => {
    return (
        <li className="NavigationItem">
            <NavLink
                to={link}
                className="NavigationItem__link"
                activeClassName="NavigationItem__link_active"
                exact={exact}
                onClick={handleLinkClick}
            >
                {children}
            </NavLink>
        </li>
    )
}

export default NavigationItem;

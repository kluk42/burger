import clsx from 'clsx';
import { NavLink } from 'react-router-dom';
import { Props } from './types';

import './NavigationItem.scss';

const NavigationItem: Props = ({ children, link, exact, handleLinkClick }) => {
  return (
    <li className="NavigationItem">
      <NavLink
        to={link}
        className={({ isActive }) =>
          clsx({ NavigationItem__link: true, NavigationItem__link_active: isActive })
        }
        onClick={handleLinkClick}
      >
        {children}
      </NavLink>
    </li>
  );
};

export default NavigationItem;

import { Props } from './types';
import './Toolbar.scss';
import DrawerToggle from '../DrawerToggle/index';
import Logo from '../Logo';
import NavigationItems from '../NavigationItems';

const Toolbar: Props = ({ handleMenuClick }) => {
  return (
    <header className="Toolbar">
      <DrawerToggle handleMenuClick={handleMenuClick} />
      <div className="Toolbar__logo">
        <Logo />
      </div>
      <nav className="Toolbar__nav">
        <NavigationItems />
      </nav>
    </header>
  );
};

export default Toolbar;

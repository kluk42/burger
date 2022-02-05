import { useState } from 'react';
import SideDrawer from '../../components/SideDrawer';
import Toolbar from '../../components/Toolbar';
import { Props } from './types';

const Layout: Props = ({ children }) => {
  const [isSideDrawerOpen, setIsSideDrawerOpen] = useState(false);

  const toggleSideDrawer = () => {
    setIsSideDrawerOpen(isSideDrawerOpen => !isSideDrawerOpen);
  };
  return (
    <>
      <Toolbar handleMenuClick={toggleSideDrawer} />
      <SideDrawer isSideDrawerOpen={isSideDrawerOpen} handleBackDropClick={toggleSideDrawer} />
      <main className="Layout">{children}</main>
    </>
  );
};

export default Layout;

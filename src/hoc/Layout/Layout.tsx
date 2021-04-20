import {Props} from './types';
import './Layout.scss';
import Toolbar from '../../components/Toolbar';
import SideDrawer from '../../components/SideDrawer';
import { useState } from 'react';

const Layout: Props = ({children}) => {
    const [isSideDrawerOpen, setIsSideDrawerOpen] = useState(false);

    const toggleSideDrawer = () => {
        setIsSideDrawerOpen(isSideDrawerOpen => !isSideDrawerOpen);
    }
    return (
        <>
            <Toolbar handleMenuClick={toggleSideDrawer}/>
            <SideDrawer isSideDrawerOpen={isSideDrawerOpen} handleBackDropClick={toggleSideDrawer}/>
            <main className="Layout">
                {children}
            </main>
        </>
    )
}

export default Layout;

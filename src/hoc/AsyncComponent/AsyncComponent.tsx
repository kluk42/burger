import { useState } from 'react';

import {Props} from './types';

import Toolbar from '../../components/Toolbar';
import SideDrawer from '../../components/SideDrawer';

const AsyncComponent: Props = ({children}) => {
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

export default AsyncComponent;

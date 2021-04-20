import {Props} from './types';
import './SideDrawer.scss';
import BackDrop from '../BackDrop';
import Logo from '../Logo/Logo';
import NavigationItems from '../NavigationItems';

const SideDrawer: Props = ({handleBackDropClick, isSideDrawerOpen}) => {
    return (
        <>
        <BackDrop show={isSideDrawerOpen} handleClick={handleBackDropClick}/>
        <div className={`SideDrawer ${isSideDrawerOpen ? 'SideDrawer_open' : 'SideDrawer_closed'}`}>
            <div className="SideDrawer__logo">
                <Logo/>
            </div>
            <nav>
                <NavigationItems/>
            </nav>
        </div>
        </>
    )
}

export default SideDrawer;

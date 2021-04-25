import {Props} from './types';
import './NavigationItems.scss';

import NavigationItem from '../NavigationItem/index';

const NavigationItems: Props = () => {
    return (
        <ul className="NavigationItems">
            <NavigationItem exact link="/">Burger Builder</NavigationItem>
            <NavigationItem exact link="/orders">Orders</NavigationItem>
        </ul>
    )
}

export default NavigationItems;

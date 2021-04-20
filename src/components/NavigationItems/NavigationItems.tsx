import {Props} from './types';
import './NavigationItems.scss';

import NavigationItem from '../NavigationItem/index';

const NavigationItems: Props = () => {
    return (
        <ul className="NavigationItems">
            <NavigationItem active={true} link="/">Burger Builder</NavigationItem>
            <NavigationItem link="/">Checkout</NavigationItem>

        </ul>
    )
}

export default NavigationItems;

import {Props} from './types';
import './NavigationItem.scss';

const NavigationItem: Props = ({children, link, active}) => {
    return (
        <li className="NavigationItem">
            <a
                href={link}
                className={`NavigationItem__link ${active && 'NavigationItem__link_active'}`}
            >
                {children}
            </a>
        </li>
    )
}

export default NavigationItem;

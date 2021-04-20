import {Props} from './types';
import './Button.scss';

const Button: Props = ({children, handleClick, theme}) => {
    return (
        <button
            onClick={handleClick}
            className={`Button ${'Button__theme_'+theme}`}
        >
            {children}
        </button>
    )
}

export default Button;

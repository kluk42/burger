import {Props} from './types';
import './Button.scss';

const Button: Props = ({children, onClick, theme, isSubmit}) => {
    return (
        <button
            onClick={onClick}
            className={`Button ${'Button__theme_'+theme}`}
            type={isSubmit ? 'submit' : 'button'}
        >
            {children}
        </button>
    )
}

export default Button;

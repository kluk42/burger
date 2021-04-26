import {Props} from './types';
import './Button.scss';

const Button: Props = ({children, onClick, theme, isSubmit, disabled}) => {
    return (
        <button
            onClick={onClick}
            className={`Button ${'Button__theme_'+theme}`}
            type={isSubmit ? 'submit' : 'button'}
            disabled={disabled}
        >
            {children}
        </button>
    )
}

export default Button;

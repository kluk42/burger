import {Props} from './types';
import './Input.scss';

const Input: Props = ({onChange, value, name, placeholder}) => {

    return (
        <div className="Input">
            <label htmlFor={name} className="Input__label">{name}</label>
            <input
                onChange={onChange}
                value={value}
                name={name}
                className="Input__field"
                placeholder={placeholder}
            />
        </div>
    )
}

export default Input;

import React from 'react';

import {Props} from './types';
import './Input.scss';
import { useState } from 'react';

const Input: Props = ({onChange, value, name, placeholder, invalid, validationMessage, type}) => {
    const [touched, setTouched] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e);
    }
    const handleBlur = () => {
        setTouched(true);
    }
    return (
        <div className="Input">
            <label htmlFor={name} className="Input__label">{name}</label>
            <input
                onChange={handleChange}
                value={value}
                name={name}
                className={`Input__field ${invalid && touched ? 'Input__field_invalid' : ''}`}
                placeholder={placeholder}
                onBlur={handleBlur}
                type={type}
            />
            {!!invalid && touched && <p>{validationMessage}</p>}
        </div>
    )
}

export default Input;

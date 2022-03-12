import React from 'react';
import './Input.scss';
import { OwnProps } from './types';

const Input = React.forwardRef<any, OwnProps>(
  ({ name, placeholder, type, validationMessage, ...props }, ref) => {
    return (
      <div className="Input">
        <label htmlFor={name} className="Input__label">
          {name}
        </label>
        <input
          className={`Input__field ${validationMessage ? 'Input__field_invalid' : ''}`}
          placeholder={placeholder}
          type={type}
          name={name}
          {...props}
          ref={ref}
        />
        {!!validationMessage && <p>{validationMessage}</p>}
      </div>
    );
  }
);

export default Input;

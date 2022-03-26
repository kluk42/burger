import { ErrorMessage } from '@hookform/error-message';
import React from 'react';
import './Input.scss';
import { OwnProps } from './types';

const Input = React.forwardRef<HTMLInputElement, OwnProps>(
  ({ name, placeholder, type, errors, isTouched, ...props }, ref) => {
    const isWithError = name && errors && name in errors && errors[name].message && isTouched;
    return (
      <div className="Input">
        <label htmlFor={name} className="Input__label">
          {name}
        </label>
        <input
          className={`Input__field ${isWithError ? 'Input__field_invalid' : ''}`}
          placeholder={placeholder}
          type={type}
          name={name}
          {...props}
          ref={ref}
        />
        {isWithError && <ErrorMessage name={name} errors={errors} message={errors[name].message} />}
      </div>
    );
  }
);

export default Input;


import React from 'react';

const Input = ({ type, name, id, value, onChange, required, placeholder, className }) => {
    return (
        <input
            type={type}
            name={name}
            id={id}
            value={value}
            onChange={onChange}
            required={required}
            placeholder={placeholder}
            className={`mt-1 block w-full p-2 border ${className}`}
        />
    );
}

export default Input;

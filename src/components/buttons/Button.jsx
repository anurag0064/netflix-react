
import React from 'react';

function  Button({ icon: Icon, text: Text, className, disabled = false, onClick = () => null }) {
  return (
      <button
        onClick={onClick}
        type={"button"}
        className={`flex items-center rounded-lg px-4 py-2 ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={disabled}
      >
        {Icon}&nbsp;{Text}
      </button>
  );
}
export default Button;

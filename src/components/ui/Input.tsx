import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  success?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', error, success, ...props }, ref) => {
    const baseClasses = 'w-full px-4 py-2.5 border-2 rounded-lg transition-all duration-300 font-inter text-base focus:outline-none';

    let stateClasses = 'border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20';

    if (error) {
      stateClasses = 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20';
    } else if (success) {
      stateClasses = 'border-green-500 focus:border-green-500 focus:ring-2 focus:ring-green-500/20';
    }

    const disabledClasses = props.disabled ? 'opacity-50 cursor-not-allowed bg-gray-50' : '';

    return (
      <input
        ref={ref}
        className={`${baseClasses} ${stateClasses} ${disabledClasses} ${className}`}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';

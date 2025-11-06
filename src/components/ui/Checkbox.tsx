import React from 'react';
import { Check } from 'lucide-react';

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className = '', label, id, ...props }, ref) => {
    return (
      <div className="flex items-center">
        <div className="relative">
          <input
            ref={ref}
            type="checkbox"
            id={id}
            className="peer sr-only"
            {...props}
          />
          <label
            htmlFor={id}
            className={`flex h-5 w-5 cursor-pointer items-center justify-center rounded border-2 border-gray-300 transition-all peer-checked:border-primary peer-checked:bg-primary peer-focus:ring-2 peer-focus:ring-primary/20 peer-disabled:cursor-not-allowed peer-disabled:opacity-50 ${className}`}
          >
            <Check className="h-3 w-3 text-white opacity-0 peer-checked:opacity-100" />
          </label>
        </div>
        {label && (
          <label
            htmlFor={id}
            className="ml-2 text-sm text-text-dark cursor-pointer font-inter"
          >
            {label}
          </label>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';

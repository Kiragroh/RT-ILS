import { cn } from '@/lib/utils';
//import React from 'react';

interface RadioOption {
  label: string;
  value: string;
  description?: string;
}

interface RadioGroupProps {
  options: RadioOption[];
  name: string;
  value?: string;
  onChange?: (value: string) => void;
  label?: string;
  error?: string;
  required?: boolean; // Add required property
}

export function RadioGroup({
  options,
  name,
  value,
  onChange,
  label,
  error,
}: RadioGroupProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="mb-2 block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <div className="space-y-3">
        {options.map((option) => (
          <label
            key={option.value}
            className={cn(
              'flex cursor-pointer items-start gap-x-3 rounded-lg border p-4 hover:bg-gray-50',
              value === option.value && 'border-blue-500 bg-blue-50 hover:bg-blue-50'
            )}
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={(e) => onChange?.(e.target.value)}
              className="mt-1 h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <div>
              <p className="font-medium text-gray-900">{option.label}</p>
              {option.description && (
                <p className="text-sm text-gray-500">{option.description}</p>
              )}
            </div>
          </label>
        ))}
      </div>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}
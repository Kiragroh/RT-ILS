import { cn } from '@/lib/utils';
import { Check, ChevronsUpDown } from 'lucide-react';
import { useState } from 'react';
import { Button } from './button';

interface ComboboxProps {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  label?: string;
  placeholder?: string;
  error?: string;
}

export function Combobox({
  value,
  onChange,
  options,
  label,
  placeholder = 'Auswählen oder eingeben...',
  error,
}: ComboboxProps) {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState(value);

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(inputValue.toLowerCase())
  );

  return (
    <div className="w-full">
      {label && (
        <label className="mb-2 block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <div className="relative">
        <div className="flex">
          <input
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              onChange(e.target.value);
              if (!open) setOpen(true);
            }}
            onFocus={() => setOpen(true)}
            className={cn(
              'w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
              error && 'border-red-500 focus:ring-red-500'
            )}
            placeholder={placeholder}
          />
          <Button
            type="button"
            variant="outline"
            className="ml-2 px-2"
            onClick={() => setOpen(!open)}
          >
            <ChevronsUpDown className="h-4 w-4" />
          </Button>
        </div>
        {open && filteredOptions.length > 0 && (
          <div className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md border border-gray-200 bg-white py-1 shadow-lg">
            {filteredOptions.map((option) => (
              <div
                key={option}
                className={cn(
                  'relative flex cursor-pointer select-none items-center px-3 py-2 text-sm hover:bg-gray-100',
                  value === option && 'bg-gray-100'
                )}
                onClick={() => {
                  onChange(option);
                  setInputValue(option);
                  setOpen(false);
                }}
              >
                <span className="block truncate">{option}</span>
                {value === option && (
                  <Check className="ml-auto h-4 w-4 text-gray-600" />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}
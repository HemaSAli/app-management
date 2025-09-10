import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select';

type Props = {
  label: string;
  options: { label: string; value: string }[];
  name: string;
  error?: string;
  required?: boolean;
  placeholder?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
};
const SelectInput = ({ label, options, error, required, placeholder, onChange, name, onBlur }: Props) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open && onBlur) {
      onBlur();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <div className="flex flex-col w-full gap-2">
      <label htmlFor={name} className={cn('text-sm font-medium')}>
        {label}
        {required && <span className="text-red-700 p-1">*</span>}
      </label>
      <div className="flex flex-col gap-1">
        <Select onValueChange={onChange} onOpenChange={setOpen}>
          <SelectTrigger className={cn('w-full', error && 'border-red-700 text-red-700')}>
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {error && <p className="text-red-700 text-xs mt-1">{error}</p>}
      </div>
    </div>
  );
};

export default SelectInput;

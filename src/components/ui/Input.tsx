import { cn } from '@/lib/utils';
import type { ComponentProps } from 'react';

type Props = ComponentProps<'input'> & {
  label: string;
  error?: string;
  name: string;
};
const Input = ({
  className,
  type,
  label,
  placeholder,
  required, // Fix this
  error,
  name,
  ...props
}: Props) => {
  return (
    <div className="flex flex-col w-full gap-2">
      <label htmlFor={name} className={cn('text-sm font-medium')}>
        {label}
        {required && <span className="text-red-700 p-1">*</span>}
      </label>
      <div className="relative flex flex-col gap-1">
        <input
          type={type}
          placeholder={placeholder}
          data-slot="input"
          className={cn(
            'transition-all duration-300 rounded-md border border-border-regular bg-card-bg-main p-2 placeholder:text-text-disabled w-full',
            'focus:outline-none focus:ring-0 focus:shadow-input focus:border-secondary-2',
            error && 'border-red-700 focus:border-red-700 focus:placeholder:text-text-disabled focus:shadow-none',
            className
          )}
          name={name}
          {...props}
        />
        {error && <p className="text-red-700 text-xs mt-1">{error}</p>}
      </div>
    </div>
  );
};

export default Input;

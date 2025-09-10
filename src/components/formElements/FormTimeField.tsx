import { cn } from '@/lib/utils';
import { type ComponentProps } from 'react';
import FormInput from './FormInput';

const FormTimeField = ({ className, ...props }: ComponentProps<typeof FormInput>) => {
  return (
    <FormInput
      className={cn(
        'bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none',
        className
      )}
      type="time"
      {...props}
    />
  );
};

export default FormTimeField;

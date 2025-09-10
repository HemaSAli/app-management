import Button from '@/components/ui/Button/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import Calendar from './Calendar';

const formatDate = (date: Date) => {
  return format(date, 'iiii, dd MMMM yyyy');
};
type Props = {
  label: string;
  value?: string;
  placeholder?: string;
  error?: string;
  required?: boolean;
  name: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
};

const DateInput = ({
  label,
  value,
  placeholder = 'Select Date',
  error,
  required = false,
  name,
  onChange,
  onBlur
}: Props) => {
  const [open, setOpen] = useState(false);

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setOpen(false);
    onChange?.(selectedDate?.toISOString() || '');
  };

  useEffect(() => {
    if (!open && onBlur) {
      onBlur?.();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <div className="flex flex-col w-full gap-2">
      <label htmlFor={name} className={cn('text-sm font-medium')}>
        {label}
        {required && <span className="text-red-700 p-1">*</span>}
      </label>
      <div className="relative flex flex-col gap-1">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <div className="flex items-center gap-2 relative">
              <Button
                className={cn(
                  'transition-all px-2 duration-300 rounded-md border border-border-regular bg-card-bg-main h-full w-full justify-start hover:bg-card-bg-main',
                  error && 'border-red-700 text-red-700'
                )}
                id="date-picker"
              >
                <span className="text-primary">{value ? formatDate(new Date(value)) : placeholder}</span>
              </Button>
              <CalendarIcon className="w-4 h-4 absolute right-2 top-1/2 -translate-y-1/2" />
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-auto overflow-hidden p-0" align="start">
            <Calendar
              mode="single"
              selected={value ? new Date(value) : undefined}
              captionLayout="dropdown"
              onSelect={handleDateSelect}
            />
          </PopoverContent>
        </Popover>
        {error && <p className="text-red-700 text-xs mt-1">{error}</p>}
      </div>
    </div>
  );
};

export default DateInput;

import DateField from '@/components/ui/DateInput';
import type { ComponentProps } from 'react';
import WithForm from './WithForm';

type Props = Omit<ComponentProps<typeof DateField>, 'error' | 'onChange' | 'onBlur'>;

const FormDateField = ({ name, ...props }: Props) => {
  return (
    <WithForm>
      {({ formState: { errors }, setValue, watch, register }) => (
        <DateField
          error={errors[name]?.message as string}
          name={name}
          onChange={(value: string) => setValue(name, value)}
          value={watch(name)}
          onBlur={() =>
            register(name).onBlur({
              target: { name, value: watch(name) },
              type: 'change'
            })
          }
          {...props}
        />
      )}
    </WithForm>
  );
};

export default FormDateField;

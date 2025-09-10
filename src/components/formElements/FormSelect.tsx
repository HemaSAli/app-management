import { type ComponentProps } from 'react';
import SelectInput from '../ui/SelectInput';
import WithForm from './WithForm';

const FormInput = ({ name, ...props }: Omit<ComponentProps<typeof SelectInput>, 'error' | 'onBlur' | 'onChange'>) => {
  return (
    <WithForm>
      {({ register, formState: { errors }, setValue, watch }) => (
        <SelectInput
          error={errors[name]?.message as string}
          {...props}
          name={name}
          onChange={(value: string) => setValue(name, value)}
          onBlur={() =>
            register(name).onBlur({
              target: { name, value: watch(name) },
              type: 'change'
            })
          }
        />
      )}
    </WithForm>
  );
};

export default FormInput;

import { type ComponentProps } from 'react';
import SelectInput from '../ui/SelectInput';
import WithForm from './WithForm';

type Props = Omit<ComponentProps<typeof SelectInput>, 'error' | 'onBlur' | 'onChange'>;
const FormInput = ({ name, ...props }: Props) => {
  return (
    <WithForm>
      {({ register, formState: { errors }, setValue, watch }) => (
        <SelectInput
          error={errors[name]?.message as string}
          name={name}
          {...props}
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

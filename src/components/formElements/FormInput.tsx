import { type ComponentProps } from 'react';
import Input from '../ui/Input';
import WithForm from './WithForm';

const FormInput = ({
  name,
  ...props
}: Omit<ComponentProps<typeof Input>, 'error' | 'onBlur' | 'onChange'> & {
  name: string;
}) => {
  return (
    <WithForm>
      {({ register, formState: { errors } }) => (
        <Input error={errors[name]?.message as string} {...props} {...register(name)} />
      )}
    </WithForm>
  );
};

export default FormInput;

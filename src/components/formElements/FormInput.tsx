import { type ComponentProps } from 'react';
import Input from '../ui/Input';
import WithForm from './WithForm';

type Props = Omit<ComponentProps<typeof Input>, 'error' | 'onBlur' | 'onChange'>;

const FormInput = ({ name, ...props }: Props) => {
  return (
    <WithForm>
      {({ register, formState: { errors } }) => (
        <Input error={errors[name]?.message as string} {...register(name)} {...props} />
      )}
    </WithForm>
  );
};

export default FormInput;

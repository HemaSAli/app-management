import links from '@/links';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { z } from 'zod';
import FormInput from '../formElements/FormInput';
import PageTitle from '../PageTitle';
import Button from '../ui/Button/button';
import { useAddPatient } from './hooks';
import PatientPhoto from './PatientPhoto';

const schema = z.object({
  fullName: z.string().min(3, {
    message: 'Name is required'
  }),
  address: z.string().min(3, {
    message: 'Address is required'
  }),
  photo: z.string().optional()
});

const AddPatient = () => {
  const addPatient = useAddPatient();
  const navigate = useNavigate();
  const methods = useForm({
    resolver: zodResolver(schema)
  });

  const onSubmit = async (data: z.infer<typeof schema>) => {
    await addPatient(data);
    navigate(links.patients());
  };

  return (
    <FormProvider {...methods}>
      <form className="flex flex-col gap-4 items-start" onSubmit={methods.handleSubmit(onSubmit)}>
        <PageTitle title="Add Patient" />
        <PatientPhoto />
        <FormInput name="fullName" label="Full Name" />
        <FormInput name="address" label="Address" />
        <Button className="self-end" type="submit">
          Add Patient
        </Button>
      </form>
    </FormProvider>
  );
};

export default AddPatient;

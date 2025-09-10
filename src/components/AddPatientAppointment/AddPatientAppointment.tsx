import links from '@/links';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router';
import { z } from 'zod';
import FormDateField from '../formElements/FormDateField';
import FormSelect from '../formElements/FormSelect';
import FormTimeField from '../formElements/FormTimeField';
import PageTitle from '../PageTitle';
import Button from '../ui/Button/button';
import { useAddPatientAppointment } from './hooks';

const schema = z.object({
  date: z.string('Date is required').refine((date) => {
    if (!date) {
      return false;
    }
    const selectedDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to start of day for accurate comparison
    return selectedDate > today;
  }, 'Date must be in the future'),
  time: z.string('Time is required'),
  dentist: z.string('Dentist is required'),
  treatment: z.string('Treatment is required')
});

const doctors = [
  { label: 'Dr. John Doe', value: 'dentist1' },
  { label: 'Dr. Jane Doe', value: 'dentist2' },
  { label: 'Dr. Jim Doe', value: 'dentist3' }
];
const treatments = [
  { label: 'Treatment 1', value: 'treatment1' },
  { label: 'Treatment 2', value: 'treatment2' },
  { label: 'Treatment 3', value: 'treatment3' }
];

const AddPatientAppointment = () => {
  const addPatientAppointment = useAddPatientAppointment();
  const navigate = useNavigate();
  const { id: patientId = '' } = useParams();
  const [loading, setLoading] = useState(false);
  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      time: '00:00'
    }
  });

  const onSubmit = async (data: z.infer<typeof schema>) => {
    setLoading(true);
    await addPatientAppointment({ ...data, patientId: patientId as string });
    navigate(links.patientDetails(patientId));
    setLoading(false);
  };

  return (
    <FormProvider {...methods}>
      <form className="flex flex-col gap-4 items-start" onSubmit={methods.handleSubmit(onSubmit)}>
        <PageTitle backButton={true} title="Add Patient Appointment" />
        <FormDateField name="date" label="Date" />
        <FormTimeField name="time" label="Time" />
        <FormSelect name="dentist" label="Dentist" options={doctors} placeholder="Select Dentist" />
        <FormSelect name="treatment" label="Treatment" options={treatments} placeholder="Select Treatment" />
        <Button className="self-end" type="submit" disabled={loading}>
          Add appointment
        </Button>
      </form>
    </FormProvider>
  );
};

export default AddPatientAppointment;

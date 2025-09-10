import { format } from 'date-fns';
import { TrashIcon } from 'lucide-react';
import Button from '../ui/Button/button';
import Card from '../ui/Card';
import { useDeleteAppointment } from './hooks';
import type { Appointment as AppointmentType } from './types';

const DetailsItem = ({ label, value }: { label: string; value: string }) => {
  return (
    <div className="flex gap-1 items-baseline">
      <p className="text-gray-500 text-sm min-w-20">{label}</p>
      <p className="font-medium text-sm">{value}</p>
    </div>
  );
};

type Props = { appointment: AppointmentType; mutatePatient: () => void };
const Appointment = ({ appointment, mutatePatient }: Props) => {
  const deleteAppointment = useDeleteAppointment();
  return (
    <Card className="relative">
      <Button
        className="absolute top-2 right-2"
        variant="ghost"
        size="icon"
        onClick={() => {
          deleteAppointment(appointment.id);
          mutatePatient();
        }}
      >
        <TrashIcon className="w-4 h-4" />
      </Button>
      <div className="flex flex-col gap-2">
        <DetailsItem label="Date" value={format(new Date(appointment.date), 'iiii, dd MMMM yyyy')} />
        <DetailsItem label="Time" value={appointment.time} />
        <DetailsItem label="Dentist" value={appointment.dentist} />
        <DetailsItem label="Treatment" value={appointment.treatment} />
      </div>
    </Card>
  );
};

export default Appointment;

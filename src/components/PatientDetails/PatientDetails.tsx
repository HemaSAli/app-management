import links from '@/links';
import { Link } from 'react-router';
import PageTitle from '../PageTitle';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import Button from '../ui/Button/button';
import { Separator } from '../ui/separator';
import { Skeleton } from '../ui/skeleton';
import Appointment from './Appointment';
import { usePatientDetails } from './hooks';
import PatientDetailsProvider from './PatientDetailsProvider';

const PatientDetailsContent = () => {
  const { patientDetails, isLoading } = usePatientDetails();
  if (isLoading) {
    return <Skeleton className="h-20 w-full" />;
  }

  if (!patientDetails) {
    return <p>Patient not found</p>;
  }

  return (
    <>
      <div className="flex items-center gap-2">
        <Avatar className="w-10 h-10">
          <AvatarImage src={patientDetails.photo} />
          <AvatarFallback>{patientDetails.fullName.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-1">
          <p className="text-base font-medium">{patientDetails.fullName}</p>
          <p className="text-sm text-gray-500">{patientDetails.address}</p>
        </div>
      </div>
      <p className="text-base font-medium mt-6">Appointments</p>
      {!!patientDetails.appointments.length && (
        <div className="flex flex-col gap-4 my-6">
          {patientDetails.appointments.map((appointment) => (
            <Appointment key={appointment.id} appointment={appointment} />
          ))}
        </div>
      )}
      {patientDetails.appointments.length === 0 && <p className="text-sm text-gray-500 py-2">No appointments found</p>}
    </>
  );
};

const PatientDetails = () => {
  const { patientDetails } = usePatientDetails();
  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-1">
          <PageTitle title="Patient Details" />
        </div>
        <Button disabled={!patientDetails}>
          <Link to={links.addPatientAppointment(patientDetails?.id ?? '')}>Add appointment</Link>
        </Button>
      </div>
      <Separator className="my-6" />
      <PatientDetailsContent />
    </div>
  );
};

const PatientDetailsWithProvider = () => {
  return (
    <PatientDetailsProvider>
      <PatientDetails />
    </PatientDetailsProvider>
  );
};

export default PatientDetailsWithProvider;

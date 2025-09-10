import useGetData from '@/hooks/useGetData';
import links from '@/links';
import { Link } from 'react-router';
import PageTitle from '../PageTitle';
import Button from '../ui/Button/button';
import { Separator } from '../ui/separator';
import { Skeleton } from '../ui/skeleton';
import PatientCard from './PatientCard';
import { type Patient } from './types';

const Loading = () => {
  return (
    <div className="flex flex-col gap-4">
      {Array.from({ length: 3 }).map((_, index) => (
        <Skeleton key={index} className="h-20 w-full" />
      ))}
    </div>
  );
};

const PatientsList = () => {
  const [patients = [], { isLoading, mutate }] = useGetData<Patient[]>('patients');

  return (
    <div className="flex flex-col">
      <div className="flex justify-between">
        <PageTitle title="Patients List" />
        <Button asChild>
          <Link to={links.addPatient()}>Add Patient</Link>
        </Button>
      </div>
      <Separator className="my-6" />
      {isLoading && <Loading />}
      {!isLoading && !!patients.length && (
        <div className="flex flex-col gap-4">
          {patients.map((patient) => (
            <PatientCard key={patient.id} patient={patient} onDelete={mutate} />
          ))}
        </div>
      )}
      {!isLoading && !patients.length && <p>No patients found</p>}
    </div>
  );
};

export default PatientsList;

import links from '@/links';
import { Link } from 'react-router';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import Button from '../ui/Button/button';
import Card from '../ui/Card';
import { useDeletePatient } from './hooks';
import { type Patient } from './types';

type Props = {
  patient: Patient;
  onDelete?: () => void;
};
const PatientCard = ({ patient, onDelete }: Props) => {
  const deletePatient = useDeletePatient();

  const handleDelete = async () => {
    await deletePatient(patient.id);
    onDelete?.();
  };

  return (
    <Card className="w-full flex-row justify-between items-center" key={patient.id}>
      <div className="flex items-start gap-2">
        <Avatar className="w-10 h-10">
          <AvatarImage src={patient.photo} />
          <AvatarFallback>{patient.fullName.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-1">
          <p className="text-base font-medium">{patient.fullName}</p>
          <p className="text-sm text-gray-500">{patient.address}</p>
        </div>
      </div>
      <div className="flex gap-2">
        <Button size="sm" asChild>
          <Link to={links.patientDetails(patient.id)}>View details</Link>
        </Button>
        <Button variant="outline" size="sm" onClick={handleDelete}>
          Remove
        </Button>
      </div>
    </Card>
  );
};

export default PatientCard;

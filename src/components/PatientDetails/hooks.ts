import axios from 'axios';
import { useContext } from 'react';
import PatientDetailsContext from './PatientDetailsContext';

export const useDeleteAppointment = () => {
  return (id: number) =>
    axios.delete(`/api/appointments/${id}`, {
      successMessage: 'Appointment deleted successfully'
    });
};

export const usePatientDetails = () => {
  const context = useContext(PatientDetailsContext);
  if (!context) {
    throw new Error('usePatientDetails must be used within a PatientDetailsProvider');
  }
  return context;
};

import axios from 'axios';

type AddPatientAppointmentData = {
  patientId: string;
  date: string;
  time: string;
  dentist: string;
  treatment: string;
};

export const useAddPatientAppointment = () => {
  return (data: AddPatientAppointmentData) =>
    axios.post('/api/appointments', data, {
      successMessage: 'Appointment created successfully'
    });
};

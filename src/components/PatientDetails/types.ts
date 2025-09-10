import type { Patient } from '../PatientsList/types';

export type Appointment = {
  id: number;
  date: string;
  time: string;
  dentist: string;
  treatment: string;
};
export type PatientDetails = Patient & {
  appointments: Appointment[];
};

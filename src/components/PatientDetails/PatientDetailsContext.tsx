import { createContext } from 'react';
import type { PatientDetails } from './types';

type PatientDetailsContextType = {
  patientDetails?: PatientDetails;
  isLoading: boolean;
  mutate: () => void;
};

const PatientDetailsContext = createContext(null as PatientDetailsContextType | null);

export default PatientDetailsContext;

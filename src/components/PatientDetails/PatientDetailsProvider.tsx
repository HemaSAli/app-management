import useGetData from '@/hooks/useGetData';
import type { ReactNode } from 'react';
import { useParams } from 'react-router';
import PatientDetailsContext from './PatientDetailsContext';
import type { PatientDetails } from './types';

type PatientDetailsProviderProps = {
  children: ReactNode;
};

const PatientDetailsProvider = ({ children }: PatientDetailsProviderProps) => {
  const { id = '' } = useParams();
  const [patientDetails, { isLoading, mutate }] = useGetData<PatientDetails>(`patients/${id}`);

  return (
    <PatientDetailsContext.Provider value={{ patientDetails, isLoading, mutate }}>
      {children}
    </PatientDetailsContext.Provider>
  );
};

export default PatientDetailsProvider;

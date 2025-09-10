const links = {
  patients: () => '/patients',
  patient: (id: string) => `/patients/${id}`,
  addPatient: () => '/patients/add',
  patientDetails: (id: string) => `/patients/${id}`,
  addPatientAppointment: (id: string) => `/patients/${id}/add-appointment`
};

export default links;

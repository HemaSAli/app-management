import { ErrorBoundary } from 'react-error-boundary';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router';
import AddPatient from './components/AddPatient/AddPatient';
import AddPatientAppointment from './components/AddPatientAppointment/AddPatientAppointment';
import NotFound from './components/NotFound/NotFound';
import PatientDetails from './components/PatientDetails/PatientDetails';
import PatientsList from './components/PatientsList/PatientsList';
import Layout from './Layout';
import links from './links';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to={links.patients()} />} />
        <Route path={links.patients()} element={<Layout />}>
          <Route index element={<PatientsList />} />
          <Route path={links.addPatient()} element={<AddPatient />} />
          <Route
            path={links.patientDetails(':id')}
            element={
              // This is just an example of how can we handle rendering errors.
              <ErrorBoundary fallback={<div>Something went wrong!</div>}>
                <PatientDetails />
              </ErrorBoundary>
            }
            errorElement={<NotFound />}
          />
          <Route path={links.addPatientAppointment(':id')} element={<AddPatientAppointment />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;

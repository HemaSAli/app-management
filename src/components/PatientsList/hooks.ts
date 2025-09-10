import axios from 'axios';

export const useDeletePatient = () => {
  return (id: string) =>
    axios
      .delete(`/api/patients/${id}`, {
        successMessage: 'Patient deleted successfully'
      })
      .then((res) => res.data);
};

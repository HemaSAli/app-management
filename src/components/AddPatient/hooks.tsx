import axios from 'axios';

type AddPatientData = {
  fullName: string;
  address?: string;
  photo?: string;
};
export const useAddPatient = () => {
  return (data: AddPatientData) =>
    axios
      .post('/api/patients', data, {
        successMessage: 'Patient created successfully'
      })
      .then((res) => res.data);
};

export const useUploadPhoto = () => {
  return async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    return axios
      .post<{ data: { url: string } }>('/api/patients/photo', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        silent: true
      })
      .then((res) => {
        return res.data;
      });
  };
};

import axios from 'axios';
import { toast } from 'sonner';

declare module 'axios' {
  interface AxiosRequestConfig {
    silent?: boolean;
    successMessage?: string;
  }
}

const setupAxios = () => {
  axios.interceptors.response.use(
    async (response) => {
      const { config } = response;
      const { method = '', silent, successMessage } = config || {};
      const isUpdateRequest = ['put', 'patch', 'post', 'delete'].includes(method);

      if (isUpdateRequest && !silent) {
        let messageKey = '';
        if (method === 'post') {
          messageKey = successMessage || 'Success!';
        } else if (['put', 'patch'].includes(method)) {
          messageKey = successMessage || 'Success!';
        } else if (method === 'delete') {
          messageKey = successMessage || 'Success!';
        }
        const message = messageKey;
        toast.success(message);
      }
      return response;
    },
    (error) => {
      const { config } = error || {};
      const { silent } = config || {};

      if (!silent) {
        let errorMessageKey = 'An unknown error occurred';

        if (error.response) {
          const { status, data } = error.response;

          if (data?.message) {
            errorMessageKey = data.message;
          } else {
            switch (status) {
              case 400:
                errorMessageKey = 'Bad request - please check your input';
                break;
              case 401:
                errorMessageKey = 'Unauthorized - please log in again';
                break;
              case 403:
                errorMessageKey = 'Access forbidden - insufficient permissions';
                break;
              case 404:
                errorMessageKey = 'Resource not found';
                break;
              case 409:
                {
                  const firstError = Object.values(data)[0];
                  if (Array.isArray(firstError)) {
                    errorMessageKey = firstError[0];
                  } else {
                    errorMessageKey = 'Conflict - resource already exists';
                  }
                }
                break;
              case 422:
                errorMessageKey = 'Validation failed - please check your input';
                break;
              case 429:
                errorMessageKey = 'Too many requests - please try again later';
                break;
              case 500:
              case 502:
              case 503:
              case 504:
                errorMessageKey = 'Server error - please try again later';
                break;
              default:
                errorMessageKey = 'Server error - please try again later';
            }
          }
        } else if (error.request) {
          errorMessageKey = 'No response from server - please check your connection';
        } else {
          errorMessageKey = 'Request failed - please try again';
        }

        const errorMessage = errorMessageKey;
        toast.error(errorMessage);
      }

      return Promise.reject(error);
    }
  );
};

setupAxios.withDefaults = () => setupAxios();
export default setupAxios;

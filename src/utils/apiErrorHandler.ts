import { AxiosError } from 'axios';

export const apiErrorHandler = (err: AxiosError): Error => {
  return new Error(err.response?.data.message);
};

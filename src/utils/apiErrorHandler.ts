import { AxiosError } from 'axios';

export const apiErrorHandler = (err: AxiosError): string => {
  return err.response?.data.message;
};

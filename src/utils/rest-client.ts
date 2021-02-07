import axiosBase from 'axios';

const axios = axiosBase.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
  responseType: 'json',
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const apiGet = (url: string, query = {}): Promise<any> => {
  return axios.get(`/api/v1${url}`, query);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const apiPost = (url: string, body = {}): Promise<any> => {
  return axios.post(`/api/v1${url}`, body);
};

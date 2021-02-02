import axiosBase from 'axios';

const axios = axiosBase.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
  responseType: 'json',
});

export const apiPost = (url: string, body = {}): Promise<any> => {
  return axios.post(`/api/v1${url}`, body);
};

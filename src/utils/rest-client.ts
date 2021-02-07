import axiosBase from 'axios';

const axios = axiosBase.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
  responseType: 'json',
});

export const apiGet = (url: string, query = {}): Promise<unknown> => {
  return axios.get(`/api/v1${url}`, query);
};

export const apiPost = (url: string, body = {}): Promise<unknown> => {
  return axios.post(`/api/v1${url}`, body);
};

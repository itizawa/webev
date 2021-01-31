import axiosBase from 'axios';

const axios = axiosBase.create({
  baseURL: 'http://localhost:8000', // バックエンドB のURL:port を指定する
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
  responseType: 'json',
});

export const apiPost = (url: string, body = {}): Promise<any> => {
  return axios.post(`/api/v1${url}`, body);
};

import axiosBase, { AxiosInstance, AxiosResponse } from 'axios';
import { apiErrorHandler } from './apiErrorHandler';

class RestClient {
  axios: AxiosInstance;
  accessToken?: string;

  constructor() {
    this.axios = axiosBase.create({
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
      },
      responseType: 'json',
    });
  }

  async apiGet(url: string, query = {}): Promise<AxiosResponse> {
    try {
      return await this.axios.get(`/api/v1${url}`, { ...query });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      throw apiErrorHandler(err);
    }
  }

  async apiPost<T>(url: string, body = {}): Promise<AxiosResponse<T>> {
    try {
      return await this.axios.post(`/api/v1${url}`, body);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      throw apiErrorHandler(err);
    }
  }

  async apiPut<T>(url: string, body = {}): Promise<AxiosResponse<T>> {
    try {
      return await this.axios.put(`/api/v1${url}`, body);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      throw apiErrorHandler(err);
    }
  }

  async apiDelete<T>(url: string, body = {}): Promise<AxiosResponse<T>> {
    try {
      return await this.axios.delete(`/api/v1${url}`, { data: body });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      throw apiErrorHandler(err);
    }
  }
}

export const restClient = new RestClient();

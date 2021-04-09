import axiosBase, { AxiosInstance, AxiosResponse } from 'axios';
import { getSession } from 'next-auth/client';
import { apiErrorHandler } from './apiErrorHandler';

class RestClient {
  axios: AxiosInstance;
  accessToken?: string;

  constructor() {
    this.axios = axiosBase.create({
      baseURL: process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000',
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
      },
      responseType: 'json',
    });
  }

  async getAccessToken() {
    if (this.accessToken == null) {
      const session = await getSession();
      this.accessToken = session?.accessToken;
    }
    return this.accessToken;
  }

  async apiGet(url: string, query = {}): Promise<AxiosResponse> {
    const accessToken = await this.getAccessToken();
    try {
      return await this.axios.get(`/api/v1${url}`, { ...query, headers: { Authorization: `Bearer ${accessToken}` } });
    } catch (err) {
      throw apiErrorHandler(err);
    }
  }

  async apiPost(url: string, body = {}): Promise<AxiosResponse> {
    const accessToken = await this.getAccessToken();
    try {
      return await this.axios.post(`/api/v1${url}`, body, { headers: { Authorization: `Bearer ${accessToken}` } });
    } catch (err) {
      throw apiErrorHandler(err);
    }
  }

  async apiPut(url: string, body = {}): Promise<AxiosResponse> {
    const accessToken = await this.getAccessToken();
    try {
      return await this.axios.put(`/api/v1${url}`, body, { headers: { Authorization: `Bearer ${accessToken}` } });
    } catch (err) {
      throw apiErrorHandler(err);
    }
  }

  async apiDelete(url: string, body = {}): Promise<AxiosResponse> {
    const accessToken = await this.getAccessToken();
    try {
      return await this.axios.delete(`/api/v1${url}`, { headers: { Authorization: `Bearer ${accessToken}` }, data: body });
    } catch (err) {
      throw apiErrorHandler(err);
    }
  }
}

export const restClient = new RestClient();

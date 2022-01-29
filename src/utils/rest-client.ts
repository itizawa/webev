import axiosBase, { AxiosInstance, AxiosResponse } from 'axios';
import { Session } from 'next-auth';
import { getSession } from 'next-auth/react';
import { apiErrorHandler } from './apiErrorHandler';

class RestClient {
  axios: AxiosInstance;
  accessToken?: string;

  constructor() {
    this.axios = axiosBase.create({
      baseURL: process.env.NEXT_PUBLIC_BACKEND_URL_FROM_CLIENT || 'http://localhost:8000',
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
      },
      responseType: 'json',
    });
  }

  async getAccessToken() {
    if (this.accessToken == null) {
      const session: Session | null = await getSession({});
      console.log(session);

      if (session != null) {
        this.accessToken = session.accessToken as string;
      }
    }
    return this.accessToken;
  }

  async apiGet(url: string, query = {}): Promise<AxiosResponse> {
    const accessToken = await this.getAccessToken();
    try {
      return await this.axios.get(`/api/v1${url}`, { ...query, headers: { Authorization: `Bearer ${accessToken}` } });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      throw apiErrorHandler(err);
    }
  }

  async apiPost<T>(url: string, body = {}): Promise<AxiosResponse<T>> {
    const accessToken = await this.getAccessToken();
    try {
      return await this.axios.post(`/api/v1${url}`, body, { headers: { Authorization: `Bearer ${accessToken}` } });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      throw apiErrorHandler(err);
    }
  }

  async apiPut<T>(url: string, body = {}): Promise<AxiosResponse<T>> {
    const accessToken = await this.getAccessToken();
    try {
      return await this.axios.put(`/api/v1${url}`, body, { headers: { Authorization: `Bearer ${accessToken}` } });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      throw apiErrorHandler(err);
    }
  }

  async apiDelete<T>(url: string, body = {}): Promise<AxiosResponse<T>> {
    const accessToken = await this.getAccessToken();
    try {
      return await this.axios.delete(`/api/v1${url}`, { headers: { Authorization: `Bearer ${accessToken}` }, data: body });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      throw apiErrorHandler(err);
    }
  }
}

export const restClient = new RestClient();

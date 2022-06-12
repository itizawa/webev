import axiosBase, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';

class RestClient {
  axios: AxiosInstance;

  constructor() {
    this.axios = axiosBase.create({
      baseURL: process.env.NEXT_PUBLIC_WEBEV_SERVER_URL,
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'Access-Control-Allow-Credentials': true,
      },
      withCredentials: true,
      responseType: 'json',
    });
  }

  async apiGet<T>(url: string, query = {}): Promise<AxiosResponse<T> | void> {
    try {
      return await this.axios.get<T>(`/api/v1${url}`, { ...query });
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(error.response?.data.message);
      }
    }
  }

  async apiPost<T>(url: string, body = {}): Promise<AxiosResponse<T> | void> {
    try {
      return await this.axios.post<T>(`/api/v1${url}`, body);
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(error.response?.data.message);
      }
    }
  }

  async apiPut<T>(url: string, body = {}): Promise<AxiosResponse<T> | void> {
    try {
      return await this.axios.put<T>(`/api/v1${url}`, body);
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(error.response?.data.message);
      }
    }
  }

  async apiDelete<T>(url: string, body = {}): Promise<AxiosResponse<T> | void> {
    try {
      return await this.axios.delete<T>(`/api/v1${url}`, { data: body });
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(error.response?.data.message);
      }
    }
  }
}

export const restClient = new RestClient();

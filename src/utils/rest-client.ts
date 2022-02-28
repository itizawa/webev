import axiosBase, { AxiosInstance, AxiosResponse } from 'axios';

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
    return await this.axios.get(`/api/${url}`, { ...query });
  }

  async apiPost<T>(url: string, body = {}): Promise<AxiosResponse<T>> {
    return await this.axios.post(`/api/${url}`, body);
  }

  async apiPut<T>(url: string, body = {}): Promise<AxiosResponse<T>> {
    return await this.axios.put(`/api/${url}`, body);
  }

  async apiDelete<T>(url: string, body = {}): Promise<AxiosResponse<T>> {
    return await this.axios.delete(`/api/${url}`, { data: body });
  }
}

export const restClient = new RestClient();

import axiosBase, { AxiosInstance } from 'axios';
import { getSession } from 'next-auth/client';

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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async apiGet(url: string, query = {}): Promise<any> {
    const accessToken = await this.getAccessToken();
    return this.axios.get(`/api/v1${url}`, { ...query, headers: { Authorization: `Bearer ${accessToken}` } });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async apiPost(url: string, body = {}): Promise<any> {
    const accessToken = await this.getAccessToken();
    return this.axios.post(`/api/v1${url}`, body, { headers: { Authorization: `Bearer ${accessToken}` } });
  }
}

export const restClient = new RestClient();

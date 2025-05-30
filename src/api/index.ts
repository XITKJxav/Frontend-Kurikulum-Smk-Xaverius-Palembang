import { APIResponse } from "@types";
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  isAxiosError,
} from "axios";

type Headers = {
  "Content-type": string;
};

export default class API {
  api: AxiosInstance;
  private headers: Headers;

  constructor() {
    this.headers = {
      "Content-type": "application/json",
    };

    this.api = axios.create({
      baseURL: `${import.meta.env.VITE_BACKEND_URL}/api/v1`,
      httpsAgent: false,
    } as AxiosRequestConfig);
  }

  async GET<T>(path: string, access_token?: string): Promise<APIResponse<T>> {
    try {
      const headers = {
        ...this.headers,
        ...(access_token && { Authorization: `Bearer ${access_token}` }),
      };
      const res = await this.api.get(path, { headers: headers });
      return res.data;
    } catch (err: AxiosError | any) {
      if (isAxiosError(err)) {
        return {
          status: false,
          status_code: err?.response?.data?.status_code,
          message: err?.response?.data?.message || err?.response?.data,
          data: null,
        } as unknown as APIResponse<T>;
      } else {
        return {
          status: false,
          status_code: 500,
          message: "Internal Server Error",
        } as APIResponse<T>;
      }
    }
  }

  async POST<T, U = T>(
    path: string,
    data: any,
    access_token?: string
  ): Promise<APIResponse<U>> {
    try {
      const headers = {
        ...this.headers,
        ...(access_token?.trim()
          ? { Authorization: `Bearer ${access_token}` }
          : {}),
      };

      const res = await this.api.post(path, data, { headers: headers });
      return res.data;
    } catch (err: AxiosError | any) {
      if (isAxiosError(err)) {
        return {
          status: false,
          status_code: err?.response?.data?.status_code,
          message: err?.response?.data?.message || err?.response?.data,
          data: null,
        } as unknown as APIResponse<U>;
      } else {
        return {
          status: false,
          status_code: 500,
          message: "Internal Server Error",
        } as APIResponse<U>;
      }
    }
  }

  async POSTFORM<T, U = T>(
    path: string,
    data: any,
    access_token?: string
  ): Promise<APIResponse<U>> {
    try {
      const headers: Headers = {
        "Content-type": "multipart/form-data",
        ...(access_token && { Authorization: `Bearer ${access_token}` }),
      };

      const res = await this.api.post(path, data, { headers });
      return res.data;
    } catch (err: AxiosError | any) {
      if (isAxiosError(err)) {
        return {
          status: false,
          status_code: err?.response?.data?.status_code,
          message: err?.response?.data?.message || err?.response?.data,
          data: null,
        } as unknown as APIResponse<U>;
      } else {
        return {
          status: false,
          status_code: 500,
          message: "Internal Server Error",
        } as APIResponse<U>;
      }
    }
  }

  async PUT<T, U = T>(
    path: string,
    data: any,
    access_token?: string
  ): Promise<APIResponse<U>> {
    try {
      const headers = {
        ...this.headers,
        ...(access_token && { Authorization: `Bearer ${access_token}` }),
      };
      const res = await this.api.put(path, data, { headers: headers });
      return res.data;
    } catch (err: AxiosError | any) {
      if (isAxiosError(err)) {
        return {
          status: false,
          status_code: err?.response?.data?.status_code,
          message: err?.response?.data?.message || err?.response?.data,
          data: null,
        } as unknown as APIResponse<U>;
      } else {
        return {
          status: false,
          status_code: 500,
          message: "Internal Server Error",
        } as APIResponse<U>;
      }
    }
  }

  async DELETE<T, U = T>(
    path: string,
    access_token?: string
  ): Promise<APIResponse<U>> {
    try {
      const headers = {
        ...(access_token && { Authorization: `Bearer ${access_token}` }),
      };
      const res = await this.api.delete(path, { headers: headers });
      return res.data;
    } catch (err: AxiosError | any) {
      if (isAxiosError(err)) {
        return {
          status: false,
          status_code: err?.response?.data?.status_code,
          message: err?.response?.data?.message || err?.response?.data,
          data: null,
        } as unknown as APIResponse<U>;
      } else {
        return {
          status: false,
          status_code: 500,
          message: "Internal Server Error",
        } as APIResponse<U>;
      }
    }
  }
}

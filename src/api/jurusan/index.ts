import { APIResponse, FetchCallback } from "@types";
import {
  JurusanCreateModel,
  JurusanModel,
  JurusanResponse,
  JurusanUpdateModel,
} from "./model";
import { apiInstance } from "@utils/authInterceptor";

export default class JurusanService {
  basePath: string = "/jurusan";

  async fetchJurusanRequest(
    params: string,
    callback: FetchCallback<JurusanResponse[]>,
    accessToken: string
  ) {
    const targetPath = `${this.basePath}?${params}`;
    const res: APIResponse<JurusanResponse[]> = await apiInstance.GET(
      targetPath,
      accessToken
    );

    if (!res?.status) {
      callback.onError(res?.message || "Unknown error");
    } else {
      callback.onSuccess(res?.data);
    }
  }

  async createJurusanRequest(
    data: JurusanCreateModel,
    callback: FetchCallback<JurusanCreateModel>,

    accessToken: string
  ) {
    const targetPath = this.basePath;
    const res: APIResponse<JurusanModel> = await apiInstance.POST(
      targetPath,
      data,
      accessToken
    );

    if (!res?.status) {
      callback.onError(res?.message || "Unknown error");
    } else {
      callback.onSuccess(res?.data);
    }
  }

  async fetchProgramJurusanById(
    id: string,
    callback: FetchCallback<JurusanModel[]>,
    accessToken: string
  ) {
    const targetPath = `${this.basePath}/${id}`;
    const res: APIResponse<JurusanModel[]> = await apiInstance.GET(
      targetPath,
      accessToken
    );

    if (!res?.status) {
      callback.onError(res?.message || "Unknown error");
    } else {
      callback.onSuccess(res?.data);
    }
  }

  async updateStatusJurusanRequest(
    id: string,
    data: JurusanUpdateModel,
    callback: FetchCallback<JurusanUpdateModel>,
    accessToken: string
  ) {
    const targetPath = `${this.basePath}/${id}`;
    const res: APIResponse<JurusanUpdateModel> = await apiInstance.PUT(
      targetPath,
      data,
      accessToken
    );

    if (!res?.status) {
      callback.onError(res?.message || "Unknown error");
    } else {
      callback.onSuccess(res?.data);
    }
  }
}

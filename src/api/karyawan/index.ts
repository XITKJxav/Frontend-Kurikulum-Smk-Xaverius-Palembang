import { APIResponse, FetchCallback } from "@types";
import {
  CreateKaryawanRequestModel,
  KaryawanModel,
  KaryawanResponseRequestModel,
  UpdateKaryawanRequestModel,
} from "./model";
import { apiInstance } from "@utils/authInterceptor";

export default class KaryawanService {
  basePath: string = "/karyawan";

  async fetchKaryawanRequest(
    params: string,
    callback: FetchCallback<KaryawanResponseRequestModel[]>,

    accessToken: string
  ) {
    const targetPath = `${this.basePath}?${params}`;
    const res: APIResponse<KaryawanResponseRequestModel[]> =
      await apiInstance.GET(targetPath, accessToken);

    if (!res?.status) {
      callback.onError(res?.message || "Unknown error");
    } else {
      callback.onSuccess(res?.data);
    }
  }

  async fetchKaryawanByIdRequest(
    kd_karyawan: string,
    callback: FetchCallback<KaryawanModel[]>,
    accessToken: string
  ) {
    const targetPath = `${this.basePath}/${kd_karyawan}`;
    const res: APIResponse<KaryawanModel[]> = await apiInstance.GET(
      targetPath,
      accessToken
    );

    if (!res?.status) {
      callback.onError(res?.message || "Unknown error");
    } else {
      callback.onSuccess(res?.data);
    }
  }

  async createKaryawanRequest(
    data: CreateKaryawanRequestModel,
    callback: FetchCallback<CreateKaryawanRequestModel>,
    accessToken: string
  ) {
    const targetPath = this.basePath;
    const res: APIResponse<CreateKaryawanRequestModel> = await apiInstance.POST(
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

  async updateKaryawanRequest(
    kd_karyawan: string,
    data: UpdateKaryawanRequestModel,
    callback: FetchCallback<UpdateKaryawanRequestModel>,
    accessToken: string
  ) {
    const targetPath = `${this.basePath}/${kd_karyawan}`;
    const res: APIResponse<UpdateKaryawanRequestModel> = await apiInstance.PUT(
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

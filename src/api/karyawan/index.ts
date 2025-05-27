import { APIResponse, FetchCallback } from "@types";
import API from "..";
import {
  CreateKaryawanRequestModel,
  KaryawanModel,
  KaryawanResponseRequestModel,
  UpdateKaryawanRequestModel,
} from "./model";
import { useNavigate } from "react-router-dom";

export default class KaryawanService {
  basePath: string = "/karyawan";
  private api: API = new API();

  async fetchKaryawanRequest(
    params: string,
    callback: FetchCallback<KaryawanResponseRequestModel[]>,
    navigate: ReturnType<typeof useNavigate>
  ) {
    const targetPath = `${this.basePath}?${params}`;
    const res: APIResponse<KaryawanResponseRequestModel[]> = await this.api.GET(
      targetPath
    );
    if (res?.status_code == 401) {
      navigate("/");
      return;
    }
    if (!res?.status) {
      callback.onError(res?.message || "Unknown error");
    } else {
      callback.onSuccess(res?.data);
    }
  }

  async fetchKaryawanByIdRequest(
    kd_karyawan: string,
    callback: FetchCallback<KaryawanModel[]>
  ) {
    const targetPath = `${this.basePath}/${kd_karyawan}`;
    const res: APIResponse<KaryawanModel[]> = await this.api.GET(targetPath);

    if (!res?.status) {
      callback.onError(res?.message || "Unknown error");
    } else {
      callback.onSuccess(res?.data);
    }
  }

  async createKaryawanRequest(
    data: CreateKaryawanRequestModel,
    callback: FetchCallback<CreateKaryawanRequestModel>
  ) {
    const targetPath = this.basePath;
    const res: APIResponse<CreateKaryawanRequestModel> = await this.api.POST(
      targetPath,
      data
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
    callback: FetchCallback<UpdateKaryawanRequestModel>
  ) {
    const targetPath = `${this.basePath}/${kd_karyawan}`;
    const res: APIResponse<UpdateKaryawanRequestModel> = await this.api.PUT(
      targetPath,
      data
    );

    if (!res?.status) {
      callback.onError(res?.message || "Unknown error");
    } else {
      callback.onSuccess(res?.data);
    }
  }
}

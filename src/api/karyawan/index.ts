import { APIResponse, FetchCallback } from "@types";
import API from "..";
import {
  CreateKaryawanRequestModel,
  KaryawanModel,
  KaryawanResponseRequestModel,
  UpdateKaryawanRequestModel,
} from "./model";
import { useNavigate } from "react-router-dom";
import { LocalStorage } from "@utils/localStorage";

export default class KaryawanService {
  basePath: string = "/karyawan";
  private api: API = new API();
  private async handleUnauthorized(
    guard: string,
    navigate: ReturnType<typeof useNavigate>
  ) {
    const { deleteItem } = LocalStorage();

    if (guard == "karyawan") {
      navigate("/sign-in");
      deleteItem("karyawanData");
    } else if (guard == "siswa") {
      navigate("/");
      deleteItem("userData");
    }
  }
  async fetchKaryawanRequest(
    params: string,
    callback: FetchCallback<KaryawanResponseRequestModel[]>,
    navigate: ReturnType<typeof useNavigate>,
    guard: string,
    accessToken: string
  ) {
    const targetPath = `${this.basePath}?${params}`;
    const res: APIResponse<KaryawanResponseRequestModel[]> = await this.api.GET(
      targetPath,
      accessToken
    );
    if (res?.status_code == 401) {
      this.handleUnauthorized(guard, navigate);
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
    callback: FetchCallback<KaryawanModel[]>,
    navigate: ReturnType<typeof useNavigate>,
    guard: string,
    accessToken: string
  ) {
    const targetPath = `${this.basePath}/${kd_karyawan}`;
    const res: APIResponse<KaryawanModel[]> = await this.api.GET(
      targetPath,
      accessToken
    );

    if (res?.status_code == 401) {
      this.handleUnauthorized(guard, navigate);
      return;
    }

    if (!res?.status) {
      callback.onError(res?.message || "Unknown error");
    } else {
      callback.onSuccess(res?.data);
    }
  }

  async createKaryawanRequest(
    data: CreateKaryawanRequestModel,
    callback: FetchCallback<CreateKaryawanRequestModel>,
    navigate: ReturnType<typeof useNavigate>,
    guard: string,
    accessToken: string
  ) {
    const targetPath = this.basePath;
    const res: APIResponse<CreateKaryawanRequestModel> = await this.api.POST(
      targetPath,
      data,
      accessToken
    );

    if (res?.status_code == 401) {
      this.handleUnauthorized(guard, navigate);
      return;
    }

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
    navigate: ReturnType<typeof useNavigate>,
    guard: string,
    accessToken: string
  ) {
    const targetPath = `${this.basePath}/${kd_karyawan}`;
    const res: APIResponse<UpdateKaryawanRequestModel> = await this.api.PUT(
      targetPath,
      data,
      accessToken
    );

    if (res?.status_code == 401) {
      this.handleUnauthorized(guard, navigate);
      return;
    }

    if (!res?.status) {
      callback.onError(res?.message || "Unknown error");
    } else {
      callback.onSuccess(res?.data);
    }
  }
}

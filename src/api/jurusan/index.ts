import { APIResponse, FetchCallback } from "@types";
import {
  JurusanCreateModel,
  JurusanModel,
  JurusanResponse,
  JurusanUpdateModel,
} from "./model";
import API from "..";
import { useNavigate } from "react-router-dom";
import { LocalStorage } from "@utils/localStorage";

export default class JurusanService {
  basePath: string = "/jurusan";
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

  async fetchJurusanRequest(
    params: string,
    callback: FetchCallback<JurusanResponse[]>,
    navigate: ReturnType<typeof useNavigate>,
    guard: string,
    accessToken: string
  ) {
    const targetPath = `${this.basePath}?${params}`;
    const res: APIResponse<JurusanResponse[]> = await this.api.GET(
      targetPath,
      accessToken
    );

    if (res?.status_code === 401) {
      this.handleUnauthorized(guard, navigate);
      return;
    }

    if (!res?.status) {
      callback.onError(res?.message || "Unknown error");
    } else {
      callback.onSuccess(res?.data);
    }
  }

  async createJurusanRequest(
    data: JurusanCreateModel,
    callback: FetchCallback<JurusanCreateModel>,
    navigate: ReturnType<typeof useNavigate>,
    guard: string,
    accessToken: string
  ) {
    const targetPath = this.basePath;
    const res: APIResponse<JurusanModel> = await this.api.POST(
      targetPath,
      data,
      accessToken
    );

    if (res?.status_code === 401) {
      this.handleUnauthorized(guard, navigate);
      return;
    }

    if (!res?.status) {
      callback.onError(res?.message || "Unknown error");
    } else {
      callback.onSuccess(res?.data);
    }
  }

  async fetchProgramJurusanById(
    id: string,
    callback: FetchCallback<JurusanModel[]>,
    navigate: ReturnType<typeof useNavigate>,
    guard: string,
    accessToken: string
  ) {
    const targetPath = `${this.basePath}/${id}`;
    const res: APIResponse<JurusanModel[]> = await this.api.GET(
      targetPath,
      accessToken
    );

    if (res?.status_code === 401) {
      this.handleUnauthorized(guard, navigate);
      return;
    }

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
    navigate: ReturnType<typeof useNavigate>,
    guard: string,
    accessToken: string
  ) {
    const targetPath = `${this.basePath}/${id}`;
    const res: APIResponse<JurusanUpdateModel> = await this.api.PUT(
      targetPath,
      data,
      accessToken
    );

    if (res?.status_code === 401) {
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

import { APIResponse, FetchCallback } from "@types";
import API from "..";
import { useNavigate } from "react-router-dom";
import {
  CreateMataPelajaranRequestModel,
  MataPelajaranModel,
  MataPelajaranResponseRequestModel,
  UpdateMataPelajaranRequestModel,
} from "./model";
import { LocalStorage } from "@utils/localStorage";

export default class MataPelajaranService {
  basePath: string = "/mata-pelajaran";
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
  async fetchMataPelajaranRequest(
    params: string,
    callback: FetchCallback<MataPelajaranResponseRequestModel[]>,
    navigate: ReturnType<typeof useNavigate>,
    guard: string,
    accessToken: string
  ) {
    const targetPath = `${this.basePath}?${params}`;
    const res: APIResponse<MataPelajaranResponseRequestModel[]> =
      await this.api.GET(targetPath, accessToken);
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

  async fetchMataPelajaranByIdRequest(
    id_mata_pelajaran: string,
    callback: FetchCallback<MataPelajaranModel[]>,
    navigate: ReturnType<typeof useNavigate>,
    guard: string,
    accessToken: string
  ) {
    const targetPath = `${this.basePath}/${id_mata_pelajaran}`;
    const res: APIResponse<MataPelajaranModel[]> = await this.api.GET(
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

  async createMataPelajaranRequest(
    data: CreateMataPelajaranRequestModel,
    callback: FetchCallback<CreateMataPelajaranRequestModel>,
    navigate: ReturnType<typeof useNavigate>,
    guard: string,
    accessToken: string
  ) {
    const targetPath = this.basePath;
    const res: APIResponse<CreateMataPelajaranRequestModel> =
      await this.api.POST(targetPath, data, accessToken);
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

  async updateMataPelajaranRequest(
    id_mata_pelajaran: string,
    data: UpdateMataPelajaranRequestModel,
    callback: FetchCallback<UpdateMataPelajaranRequestModel>,
    navigate: ReturnType<typeof useNavigate>,
    guard: string,
    accessToken: string
  ) {
    const targetPath = `${this.basePath}/${id_mata_pelajaran}`;
    const res: APIResponse<UpdateMataPelajaranRequestModel> =
      await this.api.PUT(targetPath, data, accessToken);
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

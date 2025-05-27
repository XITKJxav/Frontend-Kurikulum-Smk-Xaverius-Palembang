import { APIResponse, FetchCallback } from "@types";
import API from "..";
import { useNavigate } from "react-router-dom";
import {
  CreateMataPelajaranRequestModel,
  MataPelajaranModel,
  MataPelajaranResponseRequestModel,
  UpdateMataPelajaranRequestModel,
} from "./model";

export default class MataPelajaranService {
  basePath: string = "/mata-pelajaran";
  private api: API = new API();

  async fetchMataPelajaranRequest(
    params: string,
    callback: FetchCallback<MataPelajaranResponseRequestModel[]>,
    navigate: ReturnType<typeof useNavigate>
  ) {
    const targetPath = `${this.basePath}?${params}`;
    const res: APIResponse<MataPelajaranResponseRequestModel[]> =
      await this.api.GET(targetPath);
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

  async fetchMataPelajaranByIdRequest(
    id_mata_pelajaran: string,
    callback: FetchCallback<MataPelajaranModel[]>
  ) {
    const targetPath = `${this.basePath}/${id_mata_pelajaran}`;
    const res: APIResponse<MataPelajaranModel[]> = await this.api.GET(
      targetPath
    );

    if (!res?.status) {
      callback.onError(res?.message || "Unknown error");
    } else {
      callback.onSuccess(res?.data);
    }
  }

  async createMataPelajaranRequest(
    data: CreateMataPelajaranRequestModel,
    callback: FetchCallback<CreateMataPelajaranRequestModel>
  ) {
    const targetPath = this.basePath;
    const res: APIResponse<CreateMataPelajaranRequestModel> =
      await this.api.POST(targetPath, data);

    if (!res?.status) {
      callback.onError(res?.message || "Unknown error");
    } else {
      callback.onSuccess(res?.data);
    }
  }

  async updateMataPelajaranRequest(
    id_mata_pelajaran: string,
    data: UpdateMataPelajaranRequestModel,
    callback: FetchCallback<UpdateMataPelajaranRequestModel>
  ) {
    const targetPath = `${this.basePath}/${id_mata_pelajaran}`;
    const res: APIResponse<UpdateMataPelajaranRequestModel> =
      await this.api.PUT(targetPath, data);

    if (!res?.status) {
      callback.onError(res?.message || "Unknown error");
    } else {
      callback.onSuccess(res?.data);
    }
  }
}

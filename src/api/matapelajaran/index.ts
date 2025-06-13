import { APIResponse, FetchCallback } from "@types";
import {
  CreateMataPelajaranRequestModel,
  MataPelajaranModel,
  MataPelajaranResponseRequestModel,
  UpdateMataPelajaranRequestModel,
} from "./model";
import { apiInstance } from "@utils/authInterceptor";

export default class MataPelajaranService {
  basePath: string = "/mata-pelajaran";

  async fetchMataPelajaranRequest(
    params: string,
    callback: FetchCallback<MataPelajaranResponseRequestModel[]>,
    accessToken: string
  ) {
    const targetPath = `${this.basePath}?${params}`;
    const res: APIResponse<MataPelajaranResponseRequestModel[]> =
      await apiInstance.GET(targetPath, accessToken);

    if (!res?.status) {
      callback.onError(res?.message || "Unknown error");
    } else {
      callback.onSuccess(res?.data);
    }
  }

  async fetchMataPelajaranByIdRequest(
    id_mata_pelajaran: string,
    callback: FetchCallback<MataPelajaranModel[]>,
    accessToken: string
  ) {
    const targetPath = `${this.basePath}/${id_mata_pelajaran}`;
    const res: APIResponse<MataPelajaranModel[]> = await apiInstance.GET(
      targetPath,
      accessToken
    );

    if (!res?.status) {
      callback.onError(res?.message || "Unknown error");
    } else {
      callback.onSuccess(res?.data);
    }
  }

  async createMataPelajaranRequest(
    data: CreateMataPelajaranRequestModel,
    callback: FetchCallback<CreateMataPelajaranRequestModel>,
    accessToken: string
  ) {
    const targetPath = this.basePath;
    const res: APIResponse<CreateMataPelajaranRequestModel> =
      await apiInstance.POST(targetPath, data, accessToken);

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
    accessToken: string
  ) {
    const targetPath = `${this.basePath}/${id_mata_pelajaran}`;
    const res: APIResponse<UpdateMataPelajaranRequestModel> =
      await apiInstance.PUT(targetPath, data, accessToken);

    if (!res?.status) {
      callback.onError(res?.message || "Unknown error");
    } else {
      callback.onSuccess(res?.data);
    }
  }
}

import { APIResponse, FetchCallback } from "@types";
import API from "..";
import {
  ClassCoordinatorModel,
  ClassCoordinatorResponseModel,
  CreateClassCoordinatorModel,
  UpdateClassCoordinatorModel,
} from "./model";
import { ClassRoomModel } from "@api/classroom/model";
import { apiInstance } from "@utils/authInterceptor";

export default class ClassCoordinatorService {
  basePathSignIn: string = "/signin/ketua-kelas";
  basePathSignOut: string = "/signout/ketua-kelas";
  basePath: string = "/siswa";
  basePathClassRoom: string = "/ruang-kelas";

  private api: API = new API();

  async fetchClassCoordinatorRequest(
    params: string,
    callback: FetchCallback<ClassCoordinatorResponseModel[]>,
    accessToken: string
  ) {
    const targetPath = `${this.basePath}?${params}`;
    const res: APIResponse<ClassCoordinatorResponseModel[]> =
      await apiInstance.GET(targetPath, accessToken);

    if (!res?.status) {
      callback.onError(res?.message || "Unknown error");
    } else {
      callback.onSuccess(res?.data);
    }
  }

  async fetchClassCoordinatorByidRequest(
    id: string,
    callback: FetchCallback<ClassCoordinatorModel[]>,
    accessToken: string
  ) {
    const targetPath = `${this.basePath}/${id}`;
    const res: APIResponse<ClassCoordinatorModel[]> = await this.api.GET(
      targetPath,
      accessToken
    );

    if (!res?.status) {
      callback.onError(res?.message || "Unknown error");
    } else {
      callback.onSuccess(res?.data);
    }
  }

  async fetchClassRoomRequestOptions(
    callback: FetchCallback<ClassRoomModel[][]>,
    accessToken: string
  ) {
    const targetPath = `${this.basePathClassRoom}?offLimit=false`;

    const res: APIResponse<ClassRoomModel[][]> = await apiInstance.GET(
      targetPath,
      accessToken ?? ""
    );

    if (!res?.status) {
      callback.onError(res?.message || "Unknown error");
    } else {
      callback.onSuccess(res?.data);
    }
  }

  async createClassCoordinatorRequest(
    data: CreateClassCoordinatorModel,
    callback: FetchCallback<CreateClassCoordinatorModel>,
    accessToken: string
  ) {
    const targetPath = this.basePath;
    const res: APIResponse<CreateClassCoordinatorModel> =
      await apiInstance.POST(targetPath, data, accessToken);

    if (!res?.status) {
      callback.onError(res?.message || "Unknown error");
    } else {
      callback.onSuccess(res?.data);
    }
  }

  async updateClassCoordinatorRequest(
    kdPengurusKelas: string,
    data: UpdateClassCoordinatorModel,
    callback: FetchCallback<UpdateClassCoordinatorModel>,
    accessToken: string
  ) {
    const targetPath = `${this.basePath}/${kdPengurusKelas}`;
    const res: APIResponse<UpdateClassCoordinatorModel> = await apiInstance.PUT(
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

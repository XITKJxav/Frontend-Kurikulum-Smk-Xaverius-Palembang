import { APIResponse, FetchCallback } from "@types";
import API from "..";
import {
  ClassCoordinatorModel,
  ClassCoordinatorResponseModel,
  CreateClassCoordinatorModel,
  UpdateClassCoordinatorModel,
} from "./model";
import { ClassRoomModel } from "@api/classroom/model";
import { useNavigate } from "react-router-dom";
import { LocalStorage } from "@utils/localStorage";

export default class ClassCoordinatorService {
  basePathSignIn: string = "/signin/ketua-kelas";
  basePathSignOut: string = "/signout/ketua-kelas";
  basePath: string = "/siswa";
  basePathClassRoom: string = "/ruang-kelas";

  private api: API = new API();

  private async handleUnauthorized(navigate: ReturnType<typeof useNavigate>) {
    const { deleteItem } = LocalStorage();
    deleteItem("userData");
    navigate(0);
  }

  async fetchClassCoordinatorRequest(
    params: string,
    callback: FetchCallback<ClassCoordinatorResponseModel[]>,
    navigate: ReturnType<typeof useNavigate>
  ) {
    const targetPath = `${this.basePath}?${params}`;
    const res: APIResponse<ClassCoordinatorResponseModel[]> =
      await this.api.GET(targetPath);

    if (res?.status_code === 401) {
      this.handleUnauthorized(navigate);
      return;
    }

    if (!res?.status) {
      callback.onError(res?.message || "Unknown error");
    } else {
      callback.onSuccess(res?.data);
    }
  }

  async fetchClassCoordinatorByidRequest(
    id: string,
    access_token: string,
    callback: FetchCallback<ClassCoordinatorModel[]>,
    navigate: ReturnType<typeof useNavigate>
  ) {
    const targetPath = `${this.basePath}/${id}`;
    const res: APIResponse<ClassCoordinatorModel[]> = await this.api.GET(
      targetPath,
      access_token
    );

    if (res?.status_code === 401) {
      this.handleUnauthorized(navigate);
      return;
    }

    if (!res?.status) {
      callback.onError(res?.message || "Unknown error");
    } else {
      callback.onSuccess(res?.data);
    }
  }

  async fetchClassRoomRequestOptions(
    callback: FetchCallback<ClassRoomModel[][]>
  ) {
    const targetPath = `${this.basePathClassRoom}??offLimit=true`;

    const res: APIResponse<ClassRoomModel[][]> = await this.api.GET(targetPath);

    if (!res?.status) {
      callback.onError(res?.message || "Unknown error");
    } else {
      callback.onSuccess(res?.data);
    }
  }

  async createClassCoordinatorRequest(
    data: CreateClassCoordinatorModel,
    callback: FetchCallback<CreateClassCoordinatorModel>
  ) {
    const targetPath = this.basePath;
    const res: APIResponse<CreateClassCoordinatorModel> = await this.api.POST(
      targetPath,
      data
    );

    if (!res?.status) {
      callback.onError(res?.message || "Unknown error");
    } else {
      callback.onSuccess(res?.data);
    }
  }

  async updateClassCoordinatorRequest(
    kdPengurusKelas: string,
    data: UpdateClassCoordinatorModel,
    callback: FetchCallback<UpdateClassCoordinatorModel>
  ) {
    const targetPath = `${this.basePath}/${kdPengurusKelas}`;
    const res: APIResponse<UpdateClassCoordinatorModel> = await this.api.PUT(
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

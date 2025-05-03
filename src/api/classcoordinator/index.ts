import { APIResponse, FetchCallback } from "@types";
import API from "..";
import {
  ClassCoordinatorModel,
  ClassCoordinatorResponseModel,
  CreateClassCoordinatorModel,
  LoginClassCoordinatorModel,
} from "./model";
import { ClassRoomModel } from "@api/classroom/model";

export default class ClassCoordinatorService {
  basePathLogin: string = "/login/administorclass";
  basePath: string = "/ketua-kelas";
  basePathClassRoom: string = "/ruang-kelas";

  private api: API = new API();

  async fetchClassCoordinatorRequest(
    params: string,
    callback: FetchCallback<ClassCoordinatorResponseModel>
  ) {
    const targetPath = `${this.basePath}?${params}`;
    const res: APIResponse<ClassCoordinatorResponseModel> = await this.api.GET(
      targetPath
    );

    if (!res?.status) {
      callback.onError(res?.message || "Unknown error");
    } else {
      callback.onSuccess(res?.data);
    }
  }

  async fetchClassRoomRequestOptions(
    callback: FetchCallback<ClassRoomModel[]>
  ) {
    const targetPath = `${this.basePathClassRoom}??offLimit=true`;

    const res: APIResponse<ClassRoomModel[]> = await this.api.GET(targetPath);

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
    data: CreateClassCoordinatorModel,
    callback: FetchCallback<CreateClassCoordinatorModel>
  ) {
    const targetPath = `${this.basePath}/${kdPengurusKelas}`;
    const res: APIResponse<CreateClassCoordinatorModel> = await this.api.PUT(
      targetPath,
      data
    );

    if (!res?.status) {
      callback.onError(res?.message || "Unknown error");
    } else {
      callback.onSuccess(res?.data);
    }
  }

  async signInClassCoordinatorRequest(
    data: LoginClassCoordinatorModel,
    callback: FetchCallback<ClassCoordinatorModel>
  ) {
    const targetPath = this.basePathLogin;

    const res: APIResponse<ClassCoordinatorModel> = await this.api.POST(
      targetPath,
      data
    );

    if (!res?.status) {
      callback.onError(res?.message || "Unknown error");
    } else {
      callback.onSuccess(res.data);
    }
  }
}

import { APIResponse, FetchCallback } from "@types";
import API from "..";
import {
  ClassCoordinatorModel,
  ClassCoordinatorResponseModel,
  ClassCoordinatorSigninResponseModel,
  CreateClassCoordinatorModel,
  LoginClassCoordinatorModel,
  UpdateClassCoordinatorModel,
} from "./model";
import { ClassRoomModel } from "@api/classroom/model";
import { useNavigate } from "react-router-dom";

export default class ClassCoordinatorService {
  basePathSignIn: string = "/signin/ketua-kelas";
  basePath: string = "/ketua-kelas";
  basePathClassRoom: string = "/ruang-kelas";

  private api: API = new API();

  async fetchClassCoordinatorRequest(
    params: string,
    callback: FetchCallback<ClassCoordinatorResponseModel>,
    navigate: ReturnType<typeof useNavigate>
  ) {
    const targetPath = `${this.basePath}?${params}`;
    const res: APIResponse<ClassCoordinatorResponseModel> = await this.api.GET(
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
  async fetchClassCoordinatorByidRequest(
    id: string,
    callback: FetchCallback<ClassCoordinatorModel[]>
  ) {
    const targetPath = `${this.basePath}/${id}`;
    const res: APIResponse<ClassCoordinatorModel[]> = await this.api.GET(
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

  async signInClassCoordinatorRequest(
    data: LoginClassCoordinatorModel,
    callback: FetchCallback<ClassCoordinatorSigninResponseModel[]>
  ) {
    const targetPath = this.basePathSignIn;

    const res: APIResponse<ClassCoordinatorSigninResponseModel[]> =
      await this.api.POST(targetPath, data);

    if (!res?.status) {
      callback.onError(res?.message || "Unknown error");
    } else {
      callback.onSuccess(res.data);
    }
  }
}

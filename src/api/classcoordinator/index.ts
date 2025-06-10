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

  private async handleUnauthorized(
    guard: string,
    navigate: ReturnType<typeof useNavigate>
  ) {
    const { deleteItem } = LocalStorage();

    if (guard == "karyawan") {
      navigate("/sign-in");
      deleteItem("karyawanData");
      return;
    } else if (guard == "siswa") {
      navigate("/");
      deleteItem("userData");
      return;
    }
  }

  async fetchClassCoordinatorRequest(
    params: string,
    callback: FetchCallback<ClassCoordinatorResponseModel[]>,
    navigate: ReturnType<typeof useNavigate>,
    guard: string,
    accessToken: string
  ) {
    const targetPath = `${this.basePath}?${params}`;
    const res: APIResponse<ClassCoordinatorResponseModel[]> =
      await this.api.GET(targetPath, accessToken);

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

  async fetchClassCoordinatorByidRequest(
    id: string,
    callback: FetchCallback<ClassCoordinatorModel[]>,
    navigate: ReturnType<typeof useNavigate>,
    guard: string,
    accessToken: string
  ) {
    const targetPath = `${this.basePath}/${id}`;
    const res: APIResponse<ClassCoordinatorModel[]> = await this.api.GET(
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

  async fetchClassRoomRequestOptions(
    callback: FetchCallback<ClassRoomModel[][]>,
    navigate: ReturnType<typeof useNavigate>,
    guard: string,
    accessToken: string
  ) {
    const targetPath = `${this.basePathClassRoom}??offLimit=true`;

    const res: APIResponse<ClassRoomModel[][]> = await this.api.GET(
      targetPath,
      accessToken ?? ""
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

  async createClassCoordinatorRequest(
    data: CreateClassCoordinatorModel,
    callback: FetchCallback<CreateClassCoordinatorModel>,
    navigate: ReturnType<typeof useNavigate>,
    guard: string,
    accessToken: string
  ) {
    const targetPath = this.basePath;
    const res: APIResponse<CreateClassCoordinatorModel> = await this.api.POST(
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

  async updateClassCoordinatorRequest(
    kdPengurusKelas: string,
    data: UpdateClassCoordinatorModel,
    callback: FetchCallback<UpdateClassCoordinatorModel>,
    navigate: ReturnType<typeof useNavigate>,
    guard: string,
    accessToken: string
  ) {
    const targetPath = `${this.basePath}/${kdPengurusKelas}`;
    const res: APIResponse<UpdateClassCoordinatorModel> = await this.api.PUT(
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

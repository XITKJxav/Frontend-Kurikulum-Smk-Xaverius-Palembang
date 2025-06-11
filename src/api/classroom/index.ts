import { APIResponse, FetchCallback } from "@types";
import {
  ClassRoomCreateModel,
  ClassRoomModel,
  ClassRoomReponseModel,
  ClassRoomUpdateModel,
} from "./model";
import API from "..";
import { JurusanModel } from "@api/jurusan/model";
import { useNavigate } from "react-router-dom";
import { LocalStorage } from "@utils/localStorage";

export default class ClassRoomService {
  basePathRuangKelas: string = "/ruang-kelas";
  basePathJurusan: string = "/jurusan";
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

  async fetchClassRoomRequest(
    params: string,
    callback: FetchCallback<ClassRoomReponseModel[]>,
    navigate: ReturnType<typeof useNavigate>,
    guard: string,
    accessToken: string
  ) {
    const targetPath = `${this.basePathRuangKelas}?${params}`;
    const res: APIResponse<ClassRoomReponseModel[]> = await this.api.GET(
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

  async fetchClassRoomByIdRequest(
    id: number,
    callback: FetchCallback<ClassRoomModel[]>,
    navigate: ReturnType<typeof useNavigate>,
    guard: string,
    accessToken: string
  ) {
    const targetPath = `${this.basePathRuangKelas}/${id}`;
    const res: APIResponse<ClassRoomModel[]> = await this.api.GET(
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

  async fetchJurusanRequest(
    callback: FetchCallback<JurusanModel[][]>,
    navigate: ReturnType<typeof useNavigate>,
    guard: string,
    accessToken: string
  ) {
    const targetPath = `${this.basePathJurusan}?offLimit=true`;
    const res: APIResponse<JurusanModel[][]> = await this.api.GET(
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

  async createClassRoomRequest(
    data: ClassRoomCreateModel,
    callback: FetchCallback<ClassRoomModel[]>,
    navigate: ReturnType<typeof useNavigate>,
    guard: string,
    accessToken: string
  ) {
    const targetPath = this.basePathRuangKelas;
    const res: APIResponse<ClassRoomModel[]> = await this.api.POST(
      targetPath,
      data,
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

  async updateClassRoomRequest(
    idClassRoom: number,
    data: ClassRoomUpdateModel,
    callback: FetchCallback<ClassRoomUpdateModel>,
    navigate: ReturnType<typeof useNavigate>,
    guard: string,
    accessToken: string
  ) {
    const targetPath = `${this.basePathRuangKelas}/${idClassRoom}`;
    const res: APIResponse<ClassRoomUpdateModel> = await this.api.PUT(
      targetPath,
      data,
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
}

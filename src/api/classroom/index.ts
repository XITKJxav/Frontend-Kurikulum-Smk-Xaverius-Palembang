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

export default class ClassRoomService {
  basePathRuangKelas: string = "/ruang-kelas";
  basePathJurusan: string = "/jurusan";
  private api: API = new API();
  
  private handleUnauthorized(navigate: ReturnType<typeof useNavigate>) {
    navigate("/refresh-token");
  }

  async fetchClassRoomRequest(
    params: string,
    callback: FetchCallback<ClassRoomReponseModel[]>
  ) {
    const targetPath = `${this.basePathRuangKelas}?${params}`;
    const res: APIResponse<ClassRoomReponseModel[]> = await this.api.GET(
      targetPath
    );

    if (!res?.status) {
      callback.onError(res?.message || "Unknown error");
    } else {
      callback.onSuccess(res?.data);
    }
  }

  async fetchClassRoomByIdRequest(
    id: number,
    callback: FetchCallback<ClassRoomModel[]>
  ) {
    const targetPath = `${this.basePathRuangKelas}/${id}`;
    const res: APIResponse<ClassRoomModel[]> = await this.api.GET(targetPath);

    if (!res?.status) {
      callback.onError(res?.message || "Unknown error");
    } else {
      callback.onSuccess(res?.data);
    }
  }

  async fetchJurusanRequest(callback: FetchCallback<JurusanModel[][]>) {
    const targetPath = `${this.basePathJurusan}?offLimit=true`;
    const res: APIResponse<JurusanModel[][]> = await this.api.GET(targetPath);

    if (!res?.status) {
      callback.onError(res?.message || "Unknown error");
    } else {
      callback.onSuccess(res?.data);
    }
  }

  async createClassRoomRequest(
    data: ClassRoomCreateModel,
    callback: FetchCallback<ClassRoomModel[]>
  ) {
    const targetPath = this.basePathRuangKelas;
    const res: APIResponse<ClassRoomModel[]> = await this.api.POST(
      targetPath,
      data
    );

    if (!res?.status) {
      callback.onError(res?.message || "Unknown error");
    } else {
      callback.onSuccess(res?.data);
    }
  }

  async updateClassRoomRequest(
    idClassRoom: number,
    data: ClassRoomUpdateModel,
    callback: FetchCallback<ClassRoomUpdateModel>
  ) {
    const targetPath = `${this.basePathRuangKelas}/${idClassRoom}`;
    const res: APIResponse<ClassRoomUpdateModel> = await this.api.PUT(
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

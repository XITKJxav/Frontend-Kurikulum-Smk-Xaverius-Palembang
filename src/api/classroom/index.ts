import { APIResponse, FetchCallback } from "@types";
import {
  ClassRoomCreateModel,
  ClassRoomModel,
  ClassRoomReponseModel,
  ClassRoomUpdateModel,
} from "./model";
import API from "..";
import { JurusanModel } from "@api/jurusan/model";

export default class ClassRoomService {
  basePathRuangKelas: string = "/ruang-kelas";
  basePathJurusan: string = "/jurusan";
  private api: API = new API();

  async fetchClassRoomRequest(
    params: string,
    callback: FetchCallback<ClassRoomReponseModel>
  ) {
    const targetPath = `${this.basePathRuangKelas}?${params}`;
    const res: APIResponse<ClassRoomReponseModel> = await this.api.GET(
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

  async fetchJurusanRequest(
    params: string,
    callback: FetchCallback<JurusanModel[]>
  ) {
    const targetPath = `${this.basePathJurusan}?${params}&offLimit=true&status=1`;
    const res: APIResponse<JurusanModel[]> = await this.api.GET(targetPath);

    if (!res?.status) {
      callback.onError(res?.message || "Unknown error");
    } else {
      callback.onSuccess(res?.data);
    }
  }

  async createClassRoomRequest(
    data: ClassRoomCreateModel,
    callback: FetchCallback<ClassRoomModel>
  ) {
    const targetPath = this.basePathRuangKelas;
    const res: APIResponse<ClassRoomModel> = await this.api.POST(
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

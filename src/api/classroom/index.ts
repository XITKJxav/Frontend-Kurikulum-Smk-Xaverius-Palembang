import { APIResponse, FetchCallback } from "@types";
import {
  ClassRoomCreateModel,
  ClassRoomModel,
  ClassRoomReponseModel,
  ClassRoomUpdateModel,
} from "./model";
import { JurusanModel } from "@api/jurusan/model";
import { apiInstance } from "@utils/authInterceptor";

export default class ClassRoomService {
  basePathRuangKelas: string = "/ruang-kelas";
  basePathJurusan: string = "/jurusan";

  async fetchClassRoomRequest(
    params: string,
    callback: FetchCallback<ClassRoomReponseModel[]>,
    accessToken: string
  ) {
    const targetPath = `${this.basePathRuangKelas}?${params}`;
    const res: APIResponse<ClassRoomReponseModel[]> = await apiInstance.GET(
      targetPath,
      accessToken
    );

    if (!res?.status) {
      callback.onError(res?.message || "Unknown error");
    } else {
      callback.onSuccess(res?.data);
    }
  }

  async fetchClassRoomByIdRequest(
    id: number,
    callback: FetchCallback<ClassRoomModel[]>,
    accessToken: string
  ) {
    const targetPath = `${this.basePathRuangKelas}/${id}`;
    const res: APIResponse<ClassRoomModel[]> = await apiInstance.GET(
      targetPath,
      accessToken
    );

    if (!res?.status) {
      callback.onError(res?.message || "Unknown error");
    } else {
      callback.onSuccess(res?.data);
    }
  }

  async fetchJurusanRequest(
    callback: FetchCallback<JurusanModel[][]>,

    accessToken: string
  ) {
    const targetPath = `${this.basePathJurusan}?offLimit=true`;
    const res: APIResponse<JurusanModel[][]> = await apiInstance.GET(
      targetPath,
      accessToken
    );

    if (!res?.status) {
      callback.onError(res?.message || "Unknown error");
    } else {
      callback.onSuccess(res?.data);
    }
  }

  async createClassRoomRequest(
    data: ClassRoomCreateModel,
    callback: FetchCallback<ClassRoomModel[]>,

    accessToken: string
  ) {
    const targetPath = this.basePathRuangKelas;
    const res: APIResponse<ClassRoomModel[]> = await apiInstance.POST(
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

  async updateClassRoomRequest(
    idClassRoom: number,
    data: ClassRoomUpdateModel,
    callback: FetchCallback<ClassRoomUpdateModel>,
    accessToken: string
  ) {
    const targetPath = `${this.basePathRuangKelas}/${idClassRoom}`;
    const res: APIResponse<ClassRoomUpdateModel> = await apiInstance.PUT(
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

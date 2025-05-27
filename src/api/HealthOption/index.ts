import { APIResponse, FetchCallback } from "@types";
import API from "..";
import {
  ClassRoomOptionModel,
  JurusanOptionModel,
  KaryawanOptionModel,
  RoleOptionModel,
} from "./model";

export default class HealthOptionService {
  basePathRuangKelas: string = "/ruang-kelas";
  basePathJurusan: string = "/jurusan";
  basePathClassRoom: string = "/ruang-kelas";
  basePathRole: string = "/role";

  private api: API = new API();

  async fetchClassRoomRequestOptions(
    callback: FetchCallback<ClassRoomOptionModel[][]>
  ) {
    const targetPath = `${this.basePathRuangKelas}?offLimit=true&status=true&status_ruang_kelas=true`;
    const res: APIResponse<ClassRoomOptionModel[][]> = await this.api.GET(
      targetPath
    );

    if (!res?.status) {
      callback.onError(res?.message || "Unknown error");
    } else {
      callback.onSuccess(res?.data);
    }
  }

  async fetchJurusanRequestOptions(
    callback: FetchCallback<JurusanOptionModel[][]>
  ) {
    const targetPath = `${this.basePathJurusan}?offLimit=true&status_jurusan=true`;
    const res: APIResponse<JurusanOptionModel[][]> = await this.api.GET(
      targetPath
    );

    if (!res?.status) {
      callback.onError(res?.message || "Unknown error");
    } else {
      callback.onSuccess(res?.data);
    }
  }

  async fetchKaryawanRequestOptions(
    callback: FetchCallback<KaryawanOptionModel[][]>
  ) {
    const targetPath = `/karyawan?offLimit=true&&role=a7djw82kd1-GURU`;

    const res: APIResponse<KaryawanOptionModel[][]> = await this.api.GET(
      targetPath
    );

    if (!res?.status) {
      callback.onError(res?.message || "Unknown error");
    } else {
      callback.onSuccess(res?.data);
    }
  }

  async fetchRoleRequestOptions(callback: FetchCallback<RoleOptionModel[][]>) {
    const targetPath = `${this.basePathRole}?offLimit=true&&role=a7djw82kd1-GURU`;

    const res: APIResponse<RoleOptionModel[][]> = await this.api.GET(
      targetPath
    );

    if (!res?.status) {
      callback.onError(res?.message || "Unknown error");
    } else {
      callback.onSuccess(res?.data);
    }
  }
}

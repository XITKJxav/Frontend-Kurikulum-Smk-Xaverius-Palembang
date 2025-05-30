import { APIResponse, FetchCallback } from "@types";
import API from "..";
import {
  JurusanOptionModel,
  KaryawanOptionModel,
  MataPelajaranModel,
  RoleOptionModel,
  StatusAgendaUpacaraOptionsModel,
} from "./model";
import { ClassRoomModel } from "@api/classcoordinator/model";

export default class HealthOptionService {
  basePathRuangKelas: string = "/ruang-kelas";
  basePathJurusan: string = "/jurusan";
  basePathClassRoom: string = "/ruang-kelas";
  basePathRole: string = "/role";
  basePathStatusAgendaUpacara: string = "/status-agenda-upacara";
  basePathMataPelajaran: string = "/mata-pelajaran";
  private api: API = new API();

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
    const targetPath = `${this.basePathRole}?offLimit=true`;

    const res: APIResponse<RoleOptionModel[][]> = await this.api.GET(
      targetPath
    );

    if (!res?.status) {
      callback.onError(res?.message || "Unknown error");
    } else {
      callback.onSuccess(res?.data);
    }
  }

  async fetchStatusAgendaUpacaraRequestOptions(
    callback: FetchCallback<StatusAgendaUpacaraOptionsModel[][]>
  ) {
    const targetPath = `${this.basePathStatusAgendaUpacara}?offLimit=true`;

    const res: APIResponse<StatusAgendaUpacaraOptionsModel[][]> =
      await this.api.GET(targetPath);

    if (!res?.status) {
      callback.onError(res?.message || "Unknown error");
    } else {
      callback.onSuccess(res?.data);
    }
  }

  async fetchMataPelajaran(callback: FetchCallback<MataPelajaranModel[][]>) {
    const targetPath = `${this.basePathMataPelajaran}?offLimit=true`;

    const res: APIResponse<MataPelajaranModel[][]> = await this.api.GET(
      targetPath
    );

    if (!res?.status) {
      callback.onError(res?.message || "Unknown error");
    } else {
      callback.onSuccess(res?.data);
    }
  }
}

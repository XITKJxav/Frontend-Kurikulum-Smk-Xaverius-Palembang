import { APIResponse, FetchCallback } from "@types";
import API from "..";
import {
  JurusanOptionModel,
  MataPelajaranModel,
  RoleOptionModel,
  StatusAgendaUpacaraOptionsModel,
} from "./model";
import { ClassRoomModel } from "@api/classcoordinator/model";
import { KaryawanModel } from "@api/karyawan/model";
import { apiInstance } from "@utils/authInterceptor";

export default class HealthOptionService {
  basePathRuangKelas: string = "/ruang-kelas";
  basePathJurusan: string = "/jurusan";
  basePathClassRoom: string = "/ruang-kelas";
  basePathRole: string = "/role";
  basePathStatusAgendaUpacara: string = "/status-agenda-upacara";
  basePathMataPelajaran: string = "/mata-pelajaran";

  async fetchClassRoomRequestOptions(
    callback: FetchCallback<ClassRoomModel[][]>,

    accessToken: string
  ) {
    const targetPath = `${this.basePathClassRoom}?offLimit=true`;

    const res: APIResponse<ClassRoomModel[][]> = await apiInstance.GET(
      targetPath,
      accessToken ?? ""
    );

    if (!res?.status) {
      callback.onError(res?.message || "Unknown error");
    } else {
      callback.onSuccess(res?.data);
    }
  }

  async fetchJurusanRequestOptions(
    callback: FetchCallback<JurusanOptionModel[][]>,
    accessToken: string
  ) {
    const targetPath = `${this.basePathJurusan}?offLimit=true&status_jurusan=true`;
    const res: APIResponse<JurusanOptionModel[][]> = await apiInstance.GET(
      targetPath,
      accessToken ?? ""
    );

    if (!res?.status) {
      callback.onError(res?.message || "Unknown error");
    } else {
      callback.onSuccess(res?.data);
    }
  }

  async fetchKaryawanRequestOptions(
    callback: FetchCallback<KaryawanModel[][]>,
    accessToken: string
  ) {
    const targetPath = `/karyawan?offLimit=true&&role=a7djw82kd1-GURU`;

    const res: APIResponse<KaryawanModel[][]> = await apiInstance.GET(
      targetPath,
      accessToken ?? ""
    );

    if (!res?.status) {
      callback.onError(res?.message || "Unknown error");
    } else {
      callback.onSuccess(res?.data);
    }
  }

  async fetchRoleRequestOptions(
    callback: FetchCallback<RoleOptionModel[][]>,
    accessToken: string
  ) {
    const targetPath = `${this.basePathRole}?offLimit=true`;

    const res: APIResponse<RoleOptionModel[][]> = await apiInstance.GET(
      targetPath,
      accessToken ?? ""
    );

    if (!res?.status) {
      callback.onError(res?.message || "Unknown error");
    } else {
      callback.onSuccess(res?.data);
    }
  }

  async fetchStatusAgendaUpacaraRequestOptions(
    callback: FetchCallback<StatusAgendaUpacaraOptionsModel[][]>,
    accessToken: string
  ) {
    const targetPath = `${this.basePathStatusAgendaUpacara}?offLimit=true`;

    const res: APIResponse<StatusAgendaUpacaraOptionsModel[][]> =
      await apiInstance.GET(targetPath, accessToken);

    if (!res?.status) {
      callback.onError(res?.message || "Unknown error");
    } else {
      callback.onSuccess(res?.data);
    }
  }

  async fetchMataPelajaran(
    callback: FetchCallback<MataPelajaranModel[][]>,
    accessToken: string
  ) {
    const targetPath = `${this.basePathMataPelajaran}?offLimit=true`;

    const res: APIResponse<MataPelajaranModel[][]> = await apiInstance.GET(
      targetPath,
      accessToken
    );

    if (!res?.status) {
      callback.onError(res?.message || "Unknown error");
    } else {
      callback.onSuccess(res?.data);
    }
  }
}

import { APIResponse, FetchCallback } from "@types";
import API from "..";
import {
  JurusanOptionModel,
  MataPelajaranModel,
  RoleOptionModel,
  StatusAgendaUpacaraOptionsModel,
} from "./model";
import { ClassRoomModel } from "@api/classcoordinator/model";
import { LocalStorage } from "@utils/localStorage";
import { useNavigate } from "react-router-dom";
import { KaryawanModel } from "@api/karyawan/model";

export default class HealthOptionService {
  basePathRuangKelas: string = "/ruang-kelas";
  basePathJurusan: string = "/jurusan";
  basePathClassRoom: string = "/ruang-kelas";
  basePathRole: string = "/role";
  basePathStatusAgendaUpacara: string = "/status-agenda-upacara";
  basePathMataPelajaran: string = "/mata-pelajaran";
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
  async fetchClassRoomRequestOptions(
    callback: FetchCallback<ClassRoomModel[][]>,
    guard: string,
    navigate: ReturnType<typeof useNavigate>,
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

  async fetchJurusanRequestOptions(
    callback: FetchCallback<JurusanOptionModel[][]>,
    guard: string,
    navigate: ReturnType<typeof useNavigate>,
    accessToken: string
  ) {
    const targetPath = `${this.basePathJurusan}?offLimit=true&status_jurusan=true`;
    const res: APIResponse<JurusanOptionModel[][]> = await this.api.GET(
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

  async fetchKaryawanRequestOptions(
    callback: FetchCallback<KaryawanModel[][]>,
    guard: string,
    navigate: ReturnType<typeof useNavigate>,
    accessToken: string
  ) {
    const targetPath = `/karyawan?offLimit=true&&role=a7djw82kd1-GURU`;

    const res: APIResponse<KaryawanModel[][]> = await this.api.GET(
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

  async fetchRoleRequestOptions(
    callback: FetchCallback<RoleOptionModel[][]>,
    guard: string,
    navigate: ReturnType<typeof useNavigate>,
    accessToken: string
  ) {
    const targetPath = `${this.basePathRole}?offLimit=true`;

    const res: APIResponse<RoleOptionModel[][]> = await this.api.GET(
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

  async fetchStatusAgendaUpacaraRequestOptions(
    callback: FetchCallback<StatusAgendaUpacaraOptionsModel[][]>,
    guard: string,
    navigate: ReturnType<typeof useNavigate>,
    accessToken: string
  ) {
    const targetPath = `${this.basePathStatusAgendaUpacara}?offLimit=true`;

    const res: APIResponse<StatusAgendaUpacaraOptionsModel[][]> =
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

  async fetchMataPelajaran(
    callback: FetchCallback<MataPelajaranModel[][]>,
    guard: string,
    navigate: ReturnType<typeof useNavigate>,
    accessToken: string
  ) {
    const targetPath = `${this.basePathMataPelajaran}?offLimit=true`;

    const res: APIResponse<MataPelajaranModel[][]> = await this.api.GET(
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
}

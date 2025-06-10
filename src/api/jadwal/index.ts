import { APIResponse, FetchCallback } from "@types";
import API from "..";
import {
  CreateJadwalModel,
  DayModel,
  JadwalModel,
  JadwalUpdateModel,
  JamUpacaraModel,
  RegulerTimeModel,
  UpdateTahunAjaranModel,
} from "./model";
import { LocalStorage } from "@utils/localStorage";
import { useNavigate } from "react-router-dom";

export default class SchenduleService {
  basePathTimeReguler = "/waktu-regular";
  basePathTimeUpacara = "/waktu-upacara";
  basePathDayReguler = "/hari";
  basePathJadwal = "/jadwal";
  basePathTahunAjaran = "/tahun-ajaran";
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

  private api: API = new API();

  async fetchRegulerTimeRequest(
    params: string,
    callback: FetchCallback<RegulerTimeModel[]>,
    navigate: ReturnType<typeof useNavigate>,
    guard: string,
    accessToken: string
  ) {
    const targetPath = `${this.basePathTimeReguler}?${params}`;

    const res: APIResponse<RegulerTimeModel[]> = await this.api.GET(
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
      callback.onSuccess(res.data);
    }
  }

  async fetchRegulerTimeUpacaraRequest(
    params: string | number,
    callback: FetchCallback<JamUpacaraModel>,
    navigate: ReturnType<typeof useNavigate>,
    guard: string,
    accessToken: string
  ) {
    const targetPath = `${this.basePathTimeUpacara}?id_hari=${params}`;
    const res: APIResponse<JamUpacaraModel> = await this.api.GET(
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
      callback.onSuccess(res.data);
    }
  }

  async fetchDayRequest(
    callback: FetchCallback<DayModel[][]>,
    navigate: ReturnType<typeof useNavigate>,
    guard: string,
    accessToken: string
  ) {
    const targetPath = this.basePathDayReguler;
    const res: APIResponse<DayModel[][]> = await this.api.GET(
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
      callback.onSuccess(res.data);
    }
  }

  async fetchJadwalRequest(
    params: string,
    callback: FetchCallback<JadwalModel[][]>,
    navigate: ReturnType<typeof useNavigate>,
    guard: string,
    accessToken: string
  ) {
    const targetPath = `${this.basePathJadwal}?${params}`;
    const res: APIResponse<JadwalModel[][]> = await this.api.GET(
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
      callback.onSuccess(res.data);
    }
  }

  async createJadwalRequest(
    data: CreateJadwalModel,
    callback: FetchCallback<CreateJadwalModel>,
    navigate: ReturnType<typeof useNavigate>,
    guard: string,
    accessToken: string
  ) {
    const targetPath = this.basePathJadwal;
    const res: APIResponse<CreateJadwalModel> = await this.api.POST(
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

  async updateJadwalRequest(
    formData: JadwalUpdateModel,
    callback: FetchCallback<JadwalUpdateModel>,
    navigate: ReturnType<typeof useNavigate>,
    guard: string,
    accessToken: string
  ) {
    const targetPath = this.basePathJadwal;
    const res: APIResponse<JadwalUpdateModel> = await this.api.PUT(
      targetPath,
      formData,
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
  async fetchTahunAjaranRequest(
    callback: FetchCallback<UpdateTahunAjaranModel[]>,
    navigate: ReturnType<typeof useNavigate>,
    guard: string,
    accessToken: string
  ) {
    const targetPath = this.basePathTahunAjaran;
    const res: APIResponse<UpdateTahunAjaranModel[]> = await this.api.GET(
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

  async UpdateTahunAjaran(
    data: UpdateTahunAjaranModel,
    callback: FetchCallback<UpdateTahunAjaranModel>,
    navigate: ReturnType<typeof useNavigate>,
    guard: string,
    accessToken: string
  ) {
    const targetPath = this.basePathTahunAjaran;
    const res: APIResponse<UpdateTahunAjaranModel> = await this.api.PUT(
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

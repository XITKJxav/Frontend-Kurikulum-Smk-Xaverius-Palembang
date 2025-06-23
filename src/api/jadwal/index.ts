import { APIResponse, FetchCallback } from "@types";
import API from "..";
import {
  CreateJadwalModel,
  DayModel,
  JadwalModel,
  JadwalUpdateModel,
  JamUpacaraModel,
  QuickEntrySchenduleModel,
  RegulerTimeModel,
  UpdateTahunAjaranModel,
} from "./model";
import { apiInstance } from "@utils/authInterceptor";

export default class SchenduleService {
  basePathTimeReguler = "/waktu-regular";
  basePathTimeUpacara = "/waktu-upacara";
  basePathDayReguler = "/hari";
  basePathJadwal = "/jadwal";
  basePathTahunAjaran = "/tahun-ajaran";
  basePathBlukSchendule = "/bulk-update-schendule";

  private api: API = new API();

  async generateJadwalUpdateRequest(
    data: QuickEntrySchenduleModel,
    callback: FetchCallback<QuickEntrySchenduleModel>,
    accessToken: string
  ) {
    const targetPath = this.basePathBlukSchendule;
    const res: APIResponse<QuickEntrySchenduleModel> = await this.api.PUT(
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

  async fetchRegulerTimeRequest(
    params: string,
    callback: FetchCallback<RegulerTimeModel[]>,
    accessToken: string
  ) {
    const targetPath = `${this.basePathTimeReguler}?${params}`;

    const res: APIResponse<RegulerTimeModel[]> = await this.api.GET(
      targetPath,
      accessToken
    );

    if (!res?.status) {
      callback.onError(res?.message || "Unknown error");
    } else {
      callback.onSuccess(res.data);
    }
  }

  async fetchRegulerTimeUpacaraRequest(
    params: string | number,
    callback: FetchCallback<JamUpacaraModel>,
    accessToken: string
  ) {
    const targetPath = `${this.basePathTimeUpacara}?id_hari=${params}`;
    const res: APIResponse<JamUpacaraModel> = await apiInstance.GET(
      targetPath,
      accessToken
    );

    if (!res?.status) {
      callback.onError(res?.message || "Unknown error");
    } else {
      callback.onSuccess(res.data);
    }
  }

  async fetchDayRequest(
    callback: FetchCallback<DayModel[][]>,
    accessToken: string
  ) {
    const targetPath = this.basePathDayReguler;
    const res: APIResponse<DayModel[][]> = await apiInstance.GET(
      targetPath,
      accessToken
    );

    if (!res?.status) {
      callback.onError(res?.message || "Unknown error");
    } else {
      callback.onSuccess(res.data);
    }
  }

  async fetchJadwalRequest(
    params: string,
    callback: FetchCallback<JadwalModel[][]>,
    accessToken: string
  ) {
    const targetPath = `${this.basePathJadwal}?${params}`;
    const res: APIResponse<JadwalModel[][]> = await apiInstance.GET(
      targetPath,
      accessToken
    );

    if (!res?.status) {
      callback.onError(res?.message || "Unknown error");
    } else {
      callback.onSuccess(res.data);
    }
  }

  async createJadwalRequest(
    data: CreateJadwalModel,
    callback: FetchCallback<CreateJadwalModel>,
    accessToken: string
  ) {
    const targetPath = this.basePathJadwal;
    const res: APIResponse<CreateJadwalModel> = await apiInstance.POST(
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

  async updateJadwalRequest(
    formData: JadwalUpdateModel,
    callback: FetchCallback<JadwalUpdateModel>,
    accessToken: string
  ) {
    const targetPath = this.basePathJadwal;
    const res: APIResponse<JadwalUpdateModel> = await apiInstance.PUT(
      targetPath,
      formData,
      accessToken
    );

    if (!res?.status) {
      callback.onError(res?.message || "Unknown error");
    } else {
      callback.onSuccess(res?.data);
    }
  }

  async fetchTahunAjaranRequest(
    callback: FetchCallback<UpdateTahunAjaranModel[]>,
    accessToken: string
  ) {
    const targetPath = this.basePathTahunAjaran;
    const res: APIResponse<UpdateTahunAjaranModel[]> = await apiInstance.GET(
      targetPath,
      accessToken
    );

    if (!res?.status) {
      callback.onError(res?.message || "Unknown error");
    } else {
      callback.onSuccess(res?.data);
    }
  }

  async UpdateTahunAjaran(
    data: UpdateTahunAjaranModel,
    callback: FetchCallback<UpdateTahunAjaranModel>,
    accessToken: string
  ) {
    const targetPath = this.basePathTahunAjaran;
    const res: APIResponse<UpdateTahunAjaranModel> = await apiInstance.PUT(
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

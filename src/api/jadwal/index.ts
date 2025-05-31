import { APIResponse, FetchCallback } from "@types";
import API from "..";
import {
  CreateJadwalModel,
  DayModel,
  JadwalModel,
  JadwalUpdateModel,
  JamUpacaraModel,
  RegulerTimeModel,
} from "./model";

export default class SchenduleService {
  basePathTimeReguler = "/waktu-regular";
  basePathTimeUpacara = "/waktu-upacara";
  basePathDayReguler = "/hari";
  basePathJadwal = "/jadwal";

  private api: API = new API();

  async fetchRegulerTimeRequest(
    params: string,
    callback: FetchCallback<RegulerTimeModel[]>
  ) {
    const targetPath = `${this.basePathTimeReguler}?${params}`;

    const res: APIResponse<RegulerTimeModel[]> = await this.api.GET(targetPath);
    if (res?.status_code == 401) {
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
    callback: FetchCallback<JamUpacaraModel>
  ) {
    const targetPath = `${this.basePathTimeUpacara}?id_hari=${params}`;
    const res: APIResponse<JamUpacaraModel> = await this.api.GET(targetPath);

    if (res?.status_code == 401) {
      return;
    }

    if (!res?.status) {
      callback.onError(res?.message || "Unknown error");
    } else {
      callback.onSuccess(res.data);
    }
  }

  async fetchDayRequest(callback: FetchCallback<DayModel[][]>) {
    const targetPath = this.basePathDayReguler;
    const res: APIResponse<DayModel[][]> = await this.api.GET(targetPath);
    if (res?.status_code == 401) {
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
    callback: FetchCallback<JadwalModel[][]>
  ) {
    const targetPath = `${this.basePathJadwal}?${params}`;
    const res: APIResponse<JadwalModel[][]> = await this.api.GET(targetPath);

    if (res?.status_code == 401) {
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
    callback: FetchCallback<CreateJadwalModel>
  ) {
    const targetPath = this.basePathJadwal;
    const res: APIResponse<CreateJadwalModel> = await this.api.POST(
      targetPath,
      data
    );

    if (res?.status_code == 401) {
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
    callback: FetchCallback<JadwalUpdateModel>
  ) {
    const targetPath = this.basePathJadwal;
    const res: APIResponse<JadwalUpdateModel> = await this.api.PUT(
      targetPath,
      formData
    );

    if (res?.status_code == 401) {
      return;
    }

    if (!res?.status) {
      callback.onError(res?.message || "Unknown error");
    } else {
      callback.onSuccess(res?.data);
    }
  }
}

import { APIResponse, FetchCallback } from "@types";
import API from "..";
import { DayModel, RegulerTimeModel } from "./model";

export default class SchenduleService {
  basePathTimeReguler = "/waktu-regular";
  basePathTimeUpacara = "/waktu-upacara";
  basePathDayReguler = "/hari";
  private api: API = new API();

  async fetchRegulerTimeRequest(callback: FetchCallback<RegulerTimeModel[]>) {
    const targetPath = this.basePathTimeReguler;

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
}

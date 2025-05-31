import { APIResponse, FetchCallback } from "@types";
import API from "..";
import { DurasiPembelajaranModel } from "./model";

export default class DurasiPembelajaranService {
  basePathDurasiPembelajaran = "/durasi-pembelajaran";
  private api: API = new API();

  async fetchDurasiPembelajaranRequest(
    callback: FetchCallback<DurasiPembelajaranModel>
  ) {
    const target = this.basePathDurasiPembelajaran;
    const res: APIResponse<DurasiPembelajaranModel> =
      await this.api.GET<DurasiPembelajaranModel>(target);

    if (res?.status_code == 401) {
      return;
    }

    if (!res?.status) {
      callback.onError(res?.message || "Unknown error");
    } else {
      callback.onSuccess(res.data);
    }
  }

  async UpdateDurasiPembelajaranRequest(
    data: DurasiPembelajaranModel,
    callback: FetchCallback<DurasiPembelajaranModel>
  ) {
    const target = this.basePathDurasiPembelajaran;
    const res: APIResponse<DurasiPembelajaranModel> =
      await this.api.PUT<DurasiPembelajaranModel>(target, data);

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

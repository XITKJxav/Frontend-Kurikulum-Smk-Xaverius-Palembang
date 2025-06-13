import { APIResponse, FetchCallback } from "@types";
import { DurasiPembelajaranModel } from "./model";
import { apiInstance } from "@utils/authInterceptor";

export default class DurasiPembelajaranService {
  basePathDurasiPembelajaran = "/durasi-pembelajaran";

  async fetchDurasiPembelajaranRequest(
    callback: FetchCallback<DurasiPembelajaranModel>,
    accessToken: string
  ) {
    const target = this.basePathDurasiPembelajaran;
    const res: APIResponse<DurasiPembelajaranModel> =
      await apiInstance.GET<DurasiPembelajaranModel>(target, accessToken);

    if (!res?.status) {
      callback.onError(res?.message || "Unknown error");
    } else {
      callback.onSuccess(res.data);
    }
  }

  async UpdateDurasiPembelajaranRequest(
    data: DurasiPembelajaranModel,
    callback: FetchCallback<DurasiPembelajaranModel>,
    accessToken: string
  ) {
    const target = this.basePathDurasiPembelajaran;
    const res: APIResponse<DurasiPembelajaranModel> =
      await apiInstance.PUT<DurasiPembelajaranModel>(target, data, accessToken);

    if (!res?.status) {
      callback.onError(res?.message || "Unknown error");
    } else {
      callback.onSuccess(res.data);
    }
  }
}

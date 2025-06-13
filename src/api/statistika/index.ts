import { APIResponse, FetchCallback } from "@types";
import { StatistikModel } from "./model";
import { apiInstance } from "@utils/authInterceptor";

export default class StatistikService {
  basePathDataStatistik = "/data-statistik";

  async fetchStatistik(
    callback: FetchCallback<StatistikModel[]>,
    accessToken: string
  ) {
    const targetPath = `${this.basePathDataStatistik}`;
    const res: APIResponse<StatistikModel[]> = await apiInstance.GET(
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

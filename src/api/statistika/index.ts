import { APIResponse, FetchCallback } from "@types";
import API from "..";
import { StatistikModel } from "./model";
import { useNavigate } from "react-router-dom";

export default class StatistikService {
  basePathDataStatistik = "/data-statistik";
  api = new API();

  async fetchStatistik(
    callback: FetchCallback<StatistikModel[]>,
    navigate: ReturnType<typeof useNavigate>
  ) {
    const targetPath = `${this.basePathDataStatistik}`;
    const res: APIResponse<StatistikModel[]> = await this.api.GET(targetPath);
    if (res?.status_code == 401) {
      navigate("/");
      return;
    }
    if (!res?.status) {
      callback.onError(res?.message || "Unknown error");
    } else {
      callback.onSuccess(res?.data);
    }
  }
}

import { APIResponse, FetchCallback } from "@types";
import API from "..";
import { StatistikModel } from "./model";
import { useNavigate } from "react-router-dom";
import { LocalStorage } from "@utils/localStorage";

export default class StatistikService {
  basePathDataStatistik = "/data-statistik";
  api = new API();

  private async handleUnauthorized(
    guard: string,
    navigate: ReturnType<typeof useNavigate>
  ) {
    const { deleteItem } = LocalStorage();

    if (guard == "karyawan") {
      deleteItem("karyawanData");
      navigate("/sign-in");
      console.log("ini");
      return;
    } else if (guard == "siswa") {
      deleteItem("userData");
      navigate("/");
      return;
    }
  }

  async fetchStatistik(
    callback: FetchCallback<StatistikModel[]>,
    navigate: ReturnType<typeof useNavigate>,
    guard: string,
    accessToken: string
  ) {
    const targetPath = `${this.basePathDataStatistik}`;
    const res: APIResponse<StatistikModel[]> = await this.api.GET(
      targetPath,
      accessToken
    );
    if (res?.status_code == 401) {
      this.handleUnauthorized(guard, navigate);
      return;
    }

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

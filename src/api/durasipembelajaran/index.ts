import { APIResponse, FetchCallback } from "@types";
import API from "..";
import { DurasiPembelajaranModel } from "./model";
import { useNavigate } from "react-router-dom";
import { LocalStorage } from "@utils/localStorage";

export default class DurasiPembelajaranService {
  basePathDurasiPembelajaran = "/durasi-pembelajaran";
  private api: API = new API();
  private async handleUnauthorized(
    guard: string,
    navigate: ReturnType<typeof useNavigate>
  ) {
    const { deleteItem } = LocalStorage();

    if (guard == "karyawan") {
      navigate("/sign-in");
      deleteItem("appPage");
      deleteItem("karyawanData");
      return;
    } else if (guard == "siswa") {
      navigate("/");
      deleteItem("appPage");
      deleteItem("userData");
      return;
    }
  }

  async fetchDurasiPembelajaranRequest(
    callback: FetchCallback<DurasiPembelajaranModel>,
    navigate: ReturnType<typeof useNavigate>,
    guard: string,
    accessToken: string
  ) {
    const target = this.basePathDurasiPembelajaran;
    const res: APIResponse<DurasiPembelajaranModel> =
      await this.api.GET<DurasiPembelajaranModel>(target, accessToken);

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

  async UpdateDurasiPembelajaranRequest(
    data: DurasiPembelajaranModel,
    callback: FetchCallback<DurasiPembelajaranModel>,
    navigate: ReturnType<typeof useNavigate>,
    guard: string,
    accessToken: string
  ) {
    const target = this.basePathDurasiPembelajaran;
    const res: APIResponse<DurasiPembelajaranModel> =
      await this.api.PUT<DurasiPembelajaranModel>(target, data, accessToken);

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
}

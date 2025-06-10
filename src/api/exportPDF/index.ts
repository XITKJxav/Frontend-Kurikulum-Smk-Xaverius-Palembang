import { useNavigate } from "react-router-dom";
import API from "..";
import { LocalStorage } from "@utils/localStorage";
import { FetchCallback } from "@types";
import { DownloadJadwalPembelajaranModel } from "./model";

export default class ExportPDFService {
  basePathPembelajaranPdf = "/export-pdf-jadwal-pelajaran";
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

  async exportPembelajaranPdfRequest(
    data: DownloadJadwalPembelajaranModel,
    callback: FetchCallback<null>,
    navigate: ReturnType<typeof useNavigate>,
    guard: string,
    accessToken: string
  ): Promise<void> {
    const target = `${this.basePathPembelajaranPdf}`;

    const res = await this.api.POSTDOWNLOADBLOB(target, data, accessToken);
    console.log(res);

    if (res instanceof Blob) {
      const url = window.URL.createObjectURL(res);
      const link = document.createElement("a");
      link.href = url;
      const filename = `jadwal-pelajaran-${Date.now()}.pdf`;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      callback.onSuccess(null);
      return;
    }

    if (res?.status_code === 401) {
      this.handleUnauthorized(guard, navigate);
      return;
    }

    if (!res?.status) {
      callback.onError(res?.message || "Terjadi kesalahan saat mengunduh PDF");
      return;
    }

    callback.onSuccess(null);
  }
}

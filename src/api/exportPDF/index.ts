import API from "..";
import { FetchCallback } from "@types";
import { DownloadJadwalPembelajaranModel } from "./model";

export default class ExportPDFService {
  basePathPembelajaranPdf = "/export-pdf-jadwal-pelajaran";
  private api: API = new API();

  async exportPembelajaranPdfRequest(
    data: DownloadJadwalPembelajaranModel,
    callback: FetchCallback<null>,
    accessToken: string
  ): Promise<void> {
    const target = `${this.basePathPembelajaranPdf}`;

    const res = await apiInstance.POSTDOWNLOADBLOB(target, data, accessToken);
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

    if (!res?.status) {
      callback.onError(res?.message || "Terjadi kesalahan saat mengunduh PDF");
      return;
    }

    callback.onSuccess(null);
  }
}

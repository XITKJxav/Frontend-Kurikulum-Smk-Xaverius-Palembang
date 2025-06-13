import { useFormContext } from "react-hook-form";
import { snackbar } from "@utils/snackbar";
import { useJadwalpageContext } from "../../context";
import { LocalStorage } from "@utils/localStorage";
import { KaryawanSignInResponseRequestModel } from "@api/authentication/model";
import { DownloadJadwalPembelajaranModel } from "@api/exportPDF/model";
import ExportPDFService from "@api/exportPDF";

interface HookReturn {
  exportPembelajaranPDF: () => void;
}
const useExportPembelajaranPDF = (): HookReturn => {
  const { setState } = useJadwalpageContext();
  const { handleSubmit, trigger } = useFormContext();
  const pdfService = new ExportPDFService();
  const { getItem } = LocalStorage();
  const userData: KaryawanSignInResponseRequestModel[] =
    getItem("karyawanData") || [];

  const exportPembelajaranPDF = async () => {
    return handleSubmit(async (values) => {
      setState((prev) => ({
        ...prev,
        schendulePageLoading: true,
      }));

      const data: DownloadJadwalPembelajaranModel = {
        id_ruangan_kelas: values?.id_ruangan_kelas,
      };

      trigger();
      pdfService.exportPembelajaranPdfRequest(
        data,
        {
          onSuccess: () => {
            setState((prev) => ({
              ...prev,
              schendulePageLoading: false,
            }));
          },
          onError: (errMessage) => {
            snackbar.error(errMessage);
            setState((prev) => ({
              ...prev,
              schendulePageLoading: false,
            }));
          },
        },
        userData[0]?.access_token
      );
    })();
  };

  return {
    exportPembelajaranPDF,
  };
};

export default useExportPembelajaranPDF;

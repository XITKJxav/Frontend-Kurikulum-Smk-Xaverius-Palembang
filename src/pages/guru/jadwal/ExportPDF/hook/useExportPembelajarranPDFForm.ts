import { Resolver, useForm, UseFormReturn } from "react-hook-form";
import { useJadwalpageContext } from "../../context";

import {
  exportPDFFormatter,
  exportPDFreqDefaultValues,
  exportPDFreqValidations,
} from "../utils/form";
import { DownloadJadwalPembelajaranModel } from "@api/exportPDF/model";

interface HookReturn {
  downloadJadwalPembelajaranreqForm: UseFormReturn<DownloadJadwalPembelajaranModel>;
}
const useDownloadJadwalPembelajaranPDFForm = (): HookReturn => {
  const { state } = useJadwalpageContext();

  const downloadJadwalPembelajaranreqForm =
    useForm<DownloadJadwalPembelajaranModel>({
      defaultValues: exportPDFreqDefaultValues,
      values: exportPDFFormatter(state.exportPDFJadwalPembelajaranReq),
      resolver:
        exportPDFreqValidations as Resolver<DownloadJadwalPembelajaranModel>,
    });

  return {
    downloadJadwalPembelajaranreqForm,
  };
};
export default useDownloadJadwalPembelajaranPDFForm;

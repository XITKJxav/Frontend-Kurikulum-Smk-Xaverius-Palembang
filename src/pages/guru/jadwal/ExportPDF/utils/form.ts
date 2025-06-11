import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { DownloadJadwalPembelajaranModel } from "@api/exportPDF/model";

export const exportPDFreqDefaultValues: DownloadJadwalPembelajaranModel = {
  id_ruangan_kelas: 0,
};

export const exportPDFreqValidations = yupResolver(
  yup.object().shape({
    id_ruangan_kelas: yup.number().required("ID Ruangan tidak valid"),
  })
);

export const exportPDFFormatter = (
  data: DownloadJadwalPembelajaranModel
): DownloadJadwalPembelajaranModel => {
  return {
    id_ruangan_kelas: data?.id_ruangan_kelas,
  };
};

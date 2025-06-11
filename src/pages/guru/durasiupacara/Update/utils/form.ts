import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { DurasiPembelajaranModel } from "@api/durasipembelajaran/model";

export const durasiPembelajaranreqDefaultValues: DurasiPembelajaranModel = {
  duration_time_study: 0,
};

export const durasiPembelajaranValidations = yupResolver(
  yup.object().shape({
    duration_time_study: yup
      .number()
      .required("durasi pembelajaran tidak boleh kosong")
      .min(20, "durasi pmbelajaran tidak boleh kurang dari 20 menit"),
  })
);

export const durasiPembelajaranDetailsFormatter = (
  data: DurasiPembelajaranModel
): DurasiPembelajaranModel => {
  return {
    duration_time_study: data.duration_time_study,
  };
};

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { UpdateMataPelajaranRequestModel } from "@api/matapelajaran/model";

export const SettingKaryawanreqDefaultValues: UpdateMataPelajaranRequestModel =
  {
    nama: "",
    status: false,
  };

export const mataPelajaranValidations = yupResolver(
  yup.object().shape({
    nama: yup.string().required("Name is required"),
    status: yup.boolean().required("Status is required"),
  })
);

export const mataPelajaranDetailsFormatter = (
  data: UpdateMataPelajaranRequestModel
): UpdateMataPelajaranRequestModel => {
  return {
    nama: data?.nama,
    status: data?.status,
  };
};

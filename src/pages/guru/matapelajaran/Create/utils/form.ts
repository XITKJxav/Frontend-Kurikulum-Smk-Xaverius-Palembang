import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { CreateMataPelajaranRequestModel } from "@api/matapelajaran/model";

export const mataPelajaranreqDefaultValues: CreateMataPelajaranRequestModel = {
  nama: "",
};

export const MataPelajaranValidations = yupResolver(
  yup.object().shape({
    nama: yup.string().required("Name Mata Pelajaran is required"),
  })
);

export const MataPelajaranDetailsFormatter = (
  data: CreateMataPelajaranRequestModel
): CreateMataPelajaranRequestModel => {
  return {
    nama: data?.nama,
  };
};

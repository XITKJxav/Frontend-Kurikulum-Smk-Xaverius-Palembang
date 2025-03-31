import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { JurusanCreateModel } from "@api/jurusan/model";

export const jurusanreqDefaultValues: JurusanCreateModel = {
  nama_jurusan: "",
};

export const jurusanValidations = yupResolver(
  yup.object().shape({
    nama_jurusan: yup.string().required("Name Major is required"),
  })
);

export const JurusannDetailsFormatter = (
  data: JurusanCreateModel
): JurusanCreateModel => {
  return {
    nama_jurusan: data?.nama_jurusan,
  };
};

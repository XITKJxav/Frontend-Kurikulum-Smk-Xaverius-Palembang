import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { JurusanUpdateModel } from "@api/jurusan/model";

export const jurusanreqDefaultValues: JurusanUpdateModel = {
  status: false,
};

export const jurusanValidations = yupResolver(
  yup.object().shape({
    status: yup.boolean().required("Status is Required"),
  })
);

export const JurusannDetailsFormatter = (
  data: JurusanUpdateModel
): JurusanUpdateModel => {
  return {
    status: data?.status || false,
  };
};

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { UpdateKaryawanRequestModel } from "@api/karyawan/model";

export const karyawanreqDefaultValues: UpdateKaryawanRequestModel = {
  niy: "",
  name: "",
  email: "",
  no_telp: "",
  password: "",
  status: false,
  id_role: "",
};

export const karyawanValidations = yupResolver(
  yup.object().shape({
    niy: yup.string().max(10).required("NIY is required"),
    name: yup.string().required("Name is required"),
    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required"),
    no_telp: yup
      .string()
      .matches(/^[0-9]+$/, "Phone number must contain only digits")
      .min(10, "Phone number must be at least 10 digits")
      .required("Phone number is required"),
    password: yup.string(),
    status: yup.boolean().required("Status is required"),
    id_role: yup.string().required("Role is required"),
  })
);

export const karyawanDetailsFormatter = (
  data: UpdateKaryawanRequestModel
): UpdateKaryawanRequestModel => {
  return {
    niy: data?.niy,
    name: data?.name,
    email: data?.email,
    no_telp: data?.no_telp,
    password: data?.password,
    status: data?.status,
    id_role: data?.id_role,
  };
};

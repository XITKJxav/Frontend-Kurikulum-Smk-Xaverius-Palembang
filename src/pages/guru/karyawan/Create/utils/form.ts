import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { CreateKaryawanRequestModel } from "@api/karyawan/model";

export const karyawanreqDefaultValues: CreateKaryawanRequestModel = {
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
  no_telp: "",
  id_role: "",
};

export const karyawanValidations = yupResolver(
  yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    password_confirmation: yup
      .string()
      .oneOf([yup.ref("password")], "Password confirmation does not match")
      .required("Password confirmation is required"),
    no_telp: yup
      .string()
      .matches(/^[0-9]+$/, "Phone number must contain only digits")
      .min(10, "Phone number must be at least 10 digits")
      .required("Phone number is required"),
    id_role: yup.string().required("Role is required"),
  })
);

export const KaryawanDetailsFormatter = (
  data: CreateKaryawanRequestModel
): CreateKaryawanRequestModel => {
  return {
    name: data.name,
    email: data.email,
    password: data.password,
    password_confirmation: data.password_confirmation,
    no_telp: data.no_telp,
    id_role: data.id_role,
  };
};

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { CreateClassCoordinatorModel } from "@api/classcoordinator/model";

export const classcoordinatorreqDefaultValues: CreateClassCoordinatorModel = {
  nisn: "",
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
  id_ruang_kelas: 0,
  no_telp: "",
};

export const classCoordinatorValidations = yupResolver(
  yup.object().shape({
    nisn: yup.string().max(10).required("NISN is required"),
    name: yup.string().required("Name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    password_confirmation: yup
      .string()
      .oneOf([yup.ref("password")], "Password confirmation does not match")
      .required("Password confirmation is required"),
    id_ruang_kelas: yup
      .number()
      .typeError("Classroom must be selected")
      .moreThan(0, "Classroom must be selected")
      .required("Classroom is required"),
    no_telp: yup
      .string()
      .matches(/^[0-9]+$/, "Phone number must contain only digits")
      .required("Phone number is required"),
  })
);

export const classCoordinatorDetailsFormatter = (
  data: CreateClassCoordinatorModel
): CreateClassCoordinatorModel => {
  return {
    nisn: data.nisn,
    name: data.name,
    email: data.email,
    password: data.password,
    password_confirmation: data.password_confirmation,
    id_ruang_kelas: data.id_ruang_kelas,
    no_telp: data.no_telp,
  };
};

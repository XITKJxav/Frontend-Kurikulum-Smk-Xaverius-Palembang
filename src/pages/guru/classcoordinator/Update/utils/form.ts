import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { UpdateClassCoordinatorModel } from "@api/classcoordinator/model";

export const classcoordinatorreqDefaultValues: UpdateClassCoordinatorModel = {
  name: "",
  email: "",
  password: "",
  id_ruang_kelas: 0,
  no_telp: "",
  status: false,
};

export const classCoordinatorValidations = yupResolver(
  yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    id_ruang_kelas: yup
      .number()
      .typeError("Classroom must be selected")
      .moreThan(0, "Classroom must be selected")
      .required("Classroom is required"),
    no_telp: yup
      .string()
      .matches(/^[0-9]+$/, "Phone number must contain only digits")
      .required("Phone number is required"),
    status: yup.boolean().required("Status is required"),
  })
);

export const classCoordinatorDetailsFormatter = (
  data: UpdateClassCoordinatorModel
): UpdateClassCoordinatorModel => {
  return {
    name: data.name,
    email: data.email,
    password: data.password,
    id_ruang_kelas: data.id_ruang_kelas,
    no_telp: data.no_telp,
    status: false,
  };
};

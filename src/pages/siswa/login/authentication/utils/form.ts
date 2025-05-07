import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginClassCoordinatorModel } from "@api/classcoordinator/model";

export const signinreqDefaultValues: LoginClassCoordinatorModel = {
  email: "",
  password: "",
};

export const signInValidations = yupResolver(
  yup.object().shape({
    email: yup
      .string()
      .email("Format email tidak valid")
      .required("Email wajib diisi"),
    password: yup
      .string()
      .min(6, "Password minimal 6 karakter")
      .required("Password wajib diisi"),
  })
);

export const signInDetailsFormatter = (
  data: LoginClassCoordinatorModel
): LoginClassCoordinatorModel => {
  return {
    email: data.email,
    password: data.password,
  };
};

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginClassAdministratorModel } from "@api/classcoordinator/model";

export const signinreqDefaultValues: LoginClassAdministratorModel = {
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
  data: LoginClassAdministratorModel
): LoginClassAdministratorModel => {
  return {
    email: data.email,
    password: data.password,
  };
};

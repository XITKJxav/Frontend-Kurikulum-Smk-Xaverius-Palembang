import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { SignInRequestModel } from "@api/authentication/model";

export const karyawanSigninreqDefaultValues: SignInRequestModel = {
  email: "",
  password: "",
};

export const karyawanSignInValidations = yupResolver(
  yup.object().shape({
    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required"),
    password: yup.string(),
  })
);

export const karyawanSignInDetailsFormatter = (
  data: SignInRequestModel
): SignInRequestModel => {
  return {
    email: data.email,
    password: data.password,
  };
};

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { SignInSiswaRequestModel } from "@api/authentication/model";

export const signinreqDefaultValues: SignInSiswaRequestModel = {
  nisn: "",
  password: "",
};

export const signInValidations = yupResolver(
  yup.object().shape({
    nisn: yup.string().required("NISN is required"),
    password: yup.string().required("Password is required"),
  })
);

export const signInDetailsFormatter = (
  data: SignInSiswaRequestModel
): SignInSiswaRequestModel => {
  return {
    nisn: data.nisn,
    password: data.password,
  };
};
